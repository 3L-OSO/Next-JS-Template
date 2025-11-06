import { exec } from 'child_process'
import { exit } from 'process'

type CommandProps = {
  name: string
  command: string
}

async function runCommand(props: CommandProps) {
  try {
    await new Promise((resolve, reject) => {
      exec(props.command, (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${stderr}`)
        } else {
          resolve(stdout)
        }
      })
    })
    console.log('✓ ' + props.name + ' succeeded.')
  } catch (error) {
    console.error('✗ ' + props.name + ' failed.')
    console.error(error)
    exit(1)
  }
}

async function main() {
  const databaseMigrationCommand: CommandProps = {
    name: 'Database migrations',
    command: 'pnpm run drizzle:migrate'
  }

  const buildCommand: CommandProps = {
    name: 'Build',
    command: 'pnpm run build'
  }

  const unitTestCommand: CommandProps = {
    name: 'Unit tests',
    command: 'pnpm run test:unit'
  }

  const e2eTestCommand: CommandProps = {
    name: 'E2E tests',
    command: 'pnpm run test:e2e'
  }

  await runCommand(databaseMigrationCommand)
  await runCommand(buildCommand)
  await runCommand(unitTestCommand)
  await runCommand(e2eTestCommand)
}

main()
