import { Module } from '@nestjs/common';
import { MailQueueService } from './mail-queue.service';
import { MailProcessor } from './mail.processor.ts';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from 'src/modules/config/config.module';

@Module({
  imports: [BullModule.registerQueue({ name: 'mail' }), ConfigModule],
  providers: [MailProcessor, MailQueueService],
  exports: [MailQueueService],
})
export class EmailModule {}
