import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './modules/config/config.service';
import { ValidationPipe } from '@nestjs/common';
import { GlobalFilter } from './filters/global-filter';
import { ErrorLoggerService } from './modules/error-logs/error-logs.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalFilter(app.get(ErrorLoggerService)));

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = configService.get('PORT');

  await app.listen(port);
  console.log(`🚀 App is running on http://localhost:${port}`);
}

bootstrap();
