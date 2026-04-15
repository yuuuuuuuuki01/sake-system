import { Kysely, PgDialect } from "kysely";
import pg from "pg";

import type { Database } from "./schema.js";

const { Pool } = pg;

declare global {
  var __syusenDb__: Kysely<Database> | undefined;
}

function createClient(): Kysely<Database> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set.");
  }

  return new Kysely<Database>({
    dialect: new PgDialect({
      pool: new Pool({
        connectionString
      })
    })
  });
}

export function getDb(): Kysely<Database> {
  globalThis.__syusenDb__ ??= createClient();
  return globalThis.__syusenDb__;
}

export const db = getDb();
