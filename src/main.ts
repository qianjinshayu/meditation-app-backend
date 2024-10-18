import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FormatResponseInterceptor } from './common/interceptor/format-response.interceptor';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); // 注册全局请求校验管道
  app.useGlobalInterceptors(new FormatResponseInterceptor()); // 注册全局请求成功返回拦截器
  app.useGlobalFilters(new HttpExceptionFilter()); // 注册全局请求错误过滤器
  app.enableCors(); // 启用跨域支持
  const configService = app.get(ConfigService); // 配置抽离，从配置文件读取配置信息
  await app.listen(configService.get('nest_server_port'));
}
bootstrap();
