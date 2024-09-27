import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();

    // 返回统一的数据结构
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          statusCode: response.statusCode,
          message: 'success',
          timestamp: Date.now(),
        };
      }),
    );
  }
}
