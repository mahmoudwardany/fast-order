import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorLog } from './error-logs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ErrorLogsRepository {
  constructor(
    @InjectRepository(ErrorLog)
    private repo: Repository<ErrorLog>,
  ) {}
  createLog(data: Partial<ErrorLog>) {
    return this.repo.save(this.repo.create(data));
  }
}
