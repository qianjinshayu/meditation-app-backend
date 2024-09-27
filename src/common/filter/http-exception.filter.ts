import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException) // 只捕获 HttpException
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    // 检查 message 类型，确保可以统一处理
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any).message || exceptionResponse;

    // 统一的数据结构
    const errorResponse = {
      data: null,
      statusCode: status,
      message,
      timestamp: Date.now(),
    };

    // 返回统一的错误结构
    response.status(status).json(errorResponse);
  }
}
