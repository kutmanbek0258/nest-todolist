import { ConsoleLogger } from "@nestjs/common"

export class AppLogger extends ConsoleLogger {
    
    log(message: any, context?: string): void 
    log(message: any, ...optionalParams: any[]): void
    log(message: any, context?: any, ...rest: any[]): void {
        super.log(message, context, ...rest)
    }

    error(message: any, stack?: string, context?: string): void
    error(message: any, ...optionalParams: any[]): void
    error(message: any, stack?: any, context?: any, ...rest: any[]): void {
        super.error(message, stack, context, ...rest)
    }

    warn(message: any, context?: string): void
    warn(message: any, ...optionalParams: any[]): void
    warn(message: any, context?: any, ...rest: any[]): void {
        super.warn(message, context, ...rest)
    }

    debug(message: any, context?: string): void
    debug(message: any, ...optionalParams: any[]): void
    debug(message: any, context?: any, ...rest: any[]): void {
        super.debug(message, context, ...rest)
    }

    verbose(message: any, context?: string): void
    verbose(message: any, ...optionalParams: any[]): void
    verbose(message: any, context?: any, ...rest: any[]): void {
        super.verbose(message, context, ...rest)
    }
  }