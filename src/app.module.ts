import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './database/database.module';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from './modules/email/email.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RestaurantRequestModule } from './modules/restaurant-requests/restaurant-requests.module';

dotenv.config({
  path: path.join(process.cwd(), 'env', `${process.env.NODE_ENV?.trim()}.env`),
});

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    RestaurantRequestModule,
    EmailModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
