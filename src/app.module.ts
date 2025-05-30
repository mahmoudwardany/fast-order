import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { ConfigModule } from './config/config.module';

dotenv.config({
  path: path.join(process.cwd(), 'env', `${process.env.NODE_ENV?.trim()}.env`),
});

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
