import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RestaurantRequest } from '../entities/restaurant_request.entity';
import { MailQueueService } from 'src/modules/email/mail-queue.service';

@Injectable()
export class RequestEventListener {
  constructor(private readonly mailQueueService: MailQueueService) {}
  @OnEvent('request.approved')
  async sendApproval(request: RestaurantRequest) {
    return await this.mailQueueService.sendApprovalEmail(
      request.user.email,
      request.restaurantName,
    );
  }

  @OnEvent('request.reject')
  async sendRejection(request: RestaurantRequest) {
    return await this.mailQueueService.sendRejectionEmail(
      request.user.email,
      request.restaurantName,
      request.adminComment,
    );
  }
}
