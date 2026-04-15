import pino from "pino";

import "dotenv/config";

type AppLogger = ReturnType<typeof pino>;

declare global {
  var __syusenLogger__: AppLogger | undefined;
}

function buildLogger(): AppLogger {
  const level = process.env.LOG_LEVEL ?? "info";
  const isDevelopment = process.env.NODE_ENV === "development";
  const transport = isDevelopment
    ? pino.transport({
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname"
        }
      })
    : undefined;

  return pino({ level }, transport);
}

export const logger = (globalThis.__syusenLogger__ ??= buildLogger());

export function createLogger(context: Record<string, unknown>): AppLogger {
  return logger.child(context);
}
