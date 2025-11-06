import { getDatabaseURL } from '@/utils/databaseURL'
import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

const url = getDatabaseURL()
console.log('Database URL:', url)

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schemas/**/*.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: getDatabaseURL()
  }
})
