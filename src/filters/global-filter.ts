import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class GlobalFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus() || 500;
    const message = exception?.response
      ? exception?.response.message
      : 'Internal server error';

    response.status(status).json({
      statusCode: status,
      message,
      url: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
