import { env } from "./env";

const levels = { debug: 0, info: 1, warn: 2, error: 3 } as const;
type Level = keyof typeof levels;

function emit(level: Level, msg: string, extra?: unknown) {
  if (levels[level] < levels[env.logLevel]) return;
  const line = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${msg}`;
  if (extra !== undefined) console.log(line, extra);
  else console.log(line);
}

export const log = {
  debug: (m: string, e?: unknown) => emit("debug", m, e),
  info: (m: string, e?: unknown) => emit("info", m, e),
  warn: (m: string, e?: unknown) => emit("warn", m, e),
  error: (m: string, e?: unknown) => emit("error", m, e),
};
