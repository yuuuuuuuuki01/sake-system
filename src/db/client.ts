import { Kysely, PgDialect } from "kysely";
import pg from "pg";

import { DATABASE_URL } from "../env.js";
import { createLogger } from "../logger.js";
import type { Database } from "./schema.js";

const { Pool } = pg;
const dbLogger = createLogger({ scope: "db" });

declare global {
  var __syusenDb__: Kysely<Database> | undefined;
}

function createClient(): Kysely<Database> {
  try {
    const pool = new Pool({
      connectionString: DATABASE_URL
    });

    pool.on("error", (error) => {
      dbLogger.error({ err: error }, "database connection error");
    });

    return new Kysely<Database>({
      dialect: new PgDialect({
        pool
      })
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    dbLogger.error({ err }, "failed to initialize database client");
    throw err;
  }
}

export function getDb(): Kysely<Database> {
  globalThis.__syusenDb__ ??= createClient();
  return globalThis.__syusenDb__;
}

export const db = getDb();
