// scripts/e2e.ts
import { execSync } from 'node:child_process'
import os from 'node:os'

const args = process.argv.slice(2)
const headed = args.includes('--headed')
const reportOnly = args.includes('--report')
const rebuild = args.includes('--rebuild')

const IMAGE = 'e2e-playwright'

function sh(cmd: string) {
  console.log(`\n$ ${cmd}`)
  execSync(cmd, { stdio: 'inherit' })
}

if (reportOnly) {
  sh(`pnpm exec playwright show-report --host 0.0.0.0 --port 9323`)
  process.exit(0)
}

// Build si image absente ou --rebuild
let needBuild = rebuild
if (!rebuild) {
  try {
    execSync(`docker image inspect ${IMAGE}`, { stdio: 'ignore' })
  } catch {
    needBuild = true
  }
}
if (needBuild) {
  sh(`docker build -f docker/Dockerfile.e2e -t ${IMAGE} .`)
}

// Flags CLI : pas de --headless (c'est le défaut)
const modeArg = headed ? '--headed' : ''
const platform = os.platform()

// X11 uniquement en headed (sinon inutile)
const x11Env =
  headed && platform === 'linux'
    ? `-e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix --device /dev/dri`
    : ''

// On met une env HEADED=1 pour que le config Playwright puisse s'aligner si besoin
const headedEnv = headed ? '-e HEADED=1' : ''

sh(`
docker run --rm -it \
  --user 1000:1001 \
  -v "$PWD:/work" -w /work \
  --ipc=host --shm-size=1g \
  -p 9323:9323 \
  ${x11Env} \
  ${headedEnv} \
  ${IMAGE} \
  bash -lc "pnpm exec playwright test ${modeArg} && pnpm exec playwright show-report --host 0.0.0.0 --port 9323"
`)

console.log('\n➡️ Rapport: http://localhost:9323')
