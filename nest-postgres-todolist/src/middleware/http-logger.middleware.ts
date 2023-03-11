import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP REQUEST');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method } = request;
    const userAgent = request.get('user-agent') || '';

    request.on('close', () => {
        this.logger.log(
            `\n---------------------!!---------------------
        method: ${method}
        url: ${request.url}
        userAgent: ${userAgent}
        ip: ${ip}\n---------------------!!---------------------`
          );
    })

    next();
  }
}