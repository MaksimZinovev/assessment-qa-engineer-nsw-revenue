const LOG_LEVELS = {
  ERROR: 0,
  INFO: 1,
  DEBUG: 2,
} as const;

const currentLevel = (process.env["LOG_LEVEL"]?.trim().toUpperCase() ||
  "ERROR") as keyof typeof LOG_LEVELS;

export const logger = {
  info: (message: string, data?: unknown) => {
    if (LOG_LEVELS[currentLevel] >= LOG_LEVELS.INFO) {
      console.info(`[INFO] ${message}`, data ?? "");
    }
  },
  error: (message: string, data?: unknown) => {
    if (LOG_LEVELS[currentLevel] >= LOG_LEVELS.ERROR) {
      console.error(`[ERROR] ${message}`, data ?? "");
    }
  },
  debug: (message: string, data?: unknown) => {
    if (LOG_LEVELS[currentLevel] >= LOG_LEVELS.DEBUG) {
      console.debug(`[DEBUG] ${message}`, data ?? "");
    }
  },
};
