import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { IncomingMessage } from 'http';

export const getStatusCode = (exception: unknown): number => {
    return exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    };
  
export const getErrorMessage = (exception: unknown): string => {
    return String(exception);
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private logger = new Logger('HTTP RESPONSE');
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IncomingMessage>();
    const code = getStatusCode(exception);
    const message = getErrorMessage(exception);

    this.logger.warn(`\n---------------------!!---------------------
    statusCode: ${code} 
    error: ${message} 
    path: ${request.url} 
    message: ${exception.getResponse()['message']}
    timestamp: ${new Date().toISOString()} \n---------------------!!---------------------`);

    let sysResponse: string | object;
    let sysMessage: string[];

    try{
        sysResponse = exception.getResponse();

        if(typeof sysResponse['message'] == 'object'){
            sysMessage = sysResponse['message'];
        }else{
            sysMessage = [sysResponse['message']];
        }
        
    }catch(error){
        response.status(code).json({
            statusCode: code,
            error: message,
            path: request.url,
            message: ['Internal server error!'],
            timestamp: new Date().toISOString(),
        });
        return;
    }

    response.status(code).json({
        statusCode: code,
        error: message,
        path: request.url,
        message: sysMessage,
        timestamp: new Date().toISOString(),
    });
  }
}