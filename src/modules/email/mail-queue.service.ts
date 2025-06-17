import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MailQueueService {
  constructor(@InjectQueue('mail') private mailQueue: Queue) {}

  async sendApprovalEmail(to: string, name: string) {
    await this.mailQueue.add('send-approval', { to, name });
  }

  async sendRejectionEmail(to: string, name: string, adminComment: string) {
    await this.mailQueue.add('send-rejection', { to, name, adminComment });
  }
}
