import { exec } from 'child_process'

async function runCommand(command: string) {
  await new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${stderr}`)
      } else {
        resolve(stdout)
      }
    })
  })
}

async function main() {
  try {
    await runCommand('pnpm run drizzle:migrate')
  } catch (error) {
    console.error('[MIGRATION FAILED]', error)
  }
  await runCommand('pnpm run start')
}

main()
