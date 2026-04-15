import 'dotenv/config'

import pg from 'pg'
import { PostgresDialect } from 'kysely'
import { defineConfig } from 'kysely-ctl'

const { Pool } = pg

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required')
}

export default defineConfig({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
  migrations: {
    migrationFolder: './migrations',
  },
})
