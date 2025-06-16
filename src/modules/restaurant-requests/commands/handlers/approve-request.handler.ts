import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApproveRequestCommand } from '../approve-request.command';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotFoundException } from '@nestjs/common';
import { RestaurantRequestRepository } from '../../repository/resturant-request.repository';

@CommandHandler(ApproveRequestCommand)
export class ApproveRequestHandler
  implements ICommandHandler<ApproveRequestCommand>
{
  constructor(
    private readonly repo: RestaurantRequestRepository,
    private readonly event: EventEmitter2,
  ) {}

  async execute(command: ApproveRequestCommand) {
    const request = await this.repo.findById(command.requestId);

    if (!request) {
      throw new NotFoundException(
        `No restaurant request found with ID ${command.requestId}`,
      );
    }

    request.approve();

    request.adminComment = command.payload.adminComment;

    await this.repo.save(request);

    this.event.emit('request.approved', request);
  }
}
