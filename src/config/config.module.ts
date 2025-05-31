import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useFactory: () => {
        const env = process.env.NODE_ENV?.trim() || 'development';
        return new ConfigService(env);
      },
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
