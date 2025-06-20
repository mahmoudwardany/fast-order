import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ErrorLoggerService } from '../modules/error-logs/error-logs.service';

@Catch()
export class GlobalFilter implements ExceptionFilter {
  constructor(private readonly logger: ErrorLoggerService) {}
  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception?.response
      ? exception?.response.message
      : 'Internal server error';

    await this.logger.create({
      statusCode: status,
      message,
      stack: exception.stack,
      path: request.url,
      method: request.method,
      context: {
        body: request.body,
        query: request.query,
        params: request.params,
        user: request.user || null,
      },
    });

    response.status(status).json({
      statusCode: status,
      message,
      url: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
