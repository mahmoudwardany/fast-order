import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorLog } from './error-logs.entity';
import { ErrorLoggerService } from './error-logs.service';
import { ErrorLogsRepository } from './error-logs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ErrorLog])],
  providers: [ErrorLoggerService, ErrorLogsRepository],
  exports: [ErrorLoggerService],
})
export class ErrorlogModule {}
