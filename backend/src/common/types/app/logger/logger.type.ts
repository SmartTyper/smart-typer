type LoggerHandler = (
  data: Record<string, unknown> | string,
  description?: string,
) => void;

type Logger = {
  info: LoggerHandler;
  warn: LoggerHandler;
  error: LoggerHandler;
};

export type { Logger };
