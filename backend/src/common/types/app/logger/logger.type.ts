type LoggerHandler = (data: Record<string, unknown> | string) => void;

type Logger = {
  info: LoggerHandler;
  warn: LoggerHandler;
  error: LoggerHandler;
};

export type { Logger };
