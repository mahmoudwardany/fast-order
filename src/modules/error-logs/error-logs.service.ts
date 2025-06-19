import { Injectable } from '@nestjs/common';
import { ErrorLogsRepository } from './error-logs.repository';
import { ErrorLog } from './error-logs.entity';

@Injectable()
export class ErrorLoggerService {
  constructor(private readonly repo: ErrorLogsRepository) {}
  async create(data: Partial<ErrorLog>) {
    await this.repo.createLog(data);
  }
}
