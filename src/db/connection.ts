import { getDatabaseURL } from '@/utils/databaseURL'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: getDatabaseURL()
})
export const db = drizzle({ client: pool })
