import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const configService = app.select(ConfigModule).get(ConfigService);
  const port = configService.PORT;
  console.log(`app is listen at ${port}`);
}

bootstrap();
