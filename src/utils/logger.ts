/**
 * Logger Utility
 * 
 * Logging utility for ARC Compass.
 */

/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

/**
 * Logger configuration
 */
export interface LoggerConfig {
  level: LogLevel;
  enableConsole?: boolean;
  enableFile?: boolean;
  filePath?: string;
}

/**
 * Logger for ARC Compass
 */
export class Logger {
  private level: LogLevel;
  private enableConsole: boolean;
  private enableFile: boolean;
  private filePath?: string;
  
  /**
   * Create a new logger instance
   * 
   * @param config Logger configuration
   */
  constructor(config: LoggerConfig) {
    this.level = config.level;
    this.enableConsole = config.enableConsole !== false;
    this.enableFile = config.enableFile || false;
    this.filePath = config.filePath;
  }
  
  /**
   * Log a debug message
   * 
   * @param message Message to log
   * @param context Additional context
   */
  debug(message: string, context?: any): void {
    this.log(LogLevel.DEBUG, message, context);
  }
  
  /**
   * Log an info message
   * 
   * @param message Message to log
   * @param context Additional context
   */
  info(message: string, context?: any): void {
    this.log(LogLevel.INFO, message, context);
  }
  
  /**
   * Log a warning message
   * 
   * @param message Message to log
   * @param context Additional context
   */
  warn(message: string, context?: any): void {
    this.log(LogLevel.WARN, message, context);
  }
  
  /**
   * Log an error message
   * 
   * @param message Message to log
   * @param context Additional context
   */
  error(message: string, context?: any): void {
    this.log(LogLevel.ERROR, message, context);
  }
  
  /**
   * Log a message at the specified level
   * 
   * @param level Log level
   * @param message Message to log
   * @param context Additional context
   */
  private log(level: LogLevel, message: string, context?: any): void {
    if (level < this.level) {
      return;
    }
    
    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];
    const logMessage = `[${timestamp}] [${levelName}] ${message}`;
    
    if (this.enableConsole) {
      console.log(logMessage);
      if (context) {
        console.log(context);
      }
    }
    
    // File logging would be implemented here
  }
}
