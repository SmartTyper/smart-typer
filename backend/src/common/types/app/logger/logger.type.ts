type ObjectLogger = (
  obj: Record<string, unknown>,
  message?: string,
  ...args: unknown[]
) => void;
type ErrorLogger = (err: Error, message?: string, ...args: unknown[]) => void;
type MessageLogger = (message: string, ...args: unknown[]) => void;

type Logger = {
  info: ObjectLogger & MessageLogger;
  warn: ObjectLogger & MessageLogger;
  error: ErrorLogger & ObjectLogger & MessageLogger;
};

export type { ObjectLogger, ErrorLogger, MessageLogger, Logger };
