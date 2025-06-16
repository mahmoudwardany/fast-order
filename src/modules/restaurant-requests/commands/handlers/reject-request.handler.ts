import { EventEmitter2 } from '@nestjs/event-emitter';
import { RejectRequestCommand } from '../reject-request.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { RestaurantRequestRepository } from '../../repository/resturant-request.repository';

@CommandHandler(RejectRequestCommand)
export class RejectRequestHandler
  implements ICommandHandler<RejectRequestCommand>
{
  constructor(
    private readonly repo: RestaurantRequestRepository,
    private readonly events: EventEmitter2,
  ) {}

  async execute(command: RejectRequestCommand) {
    const request = await this.repo.findById(command.requestId);

    if (!request) {
      throw new NotFoundException(
        `No restaurant request found with ID ${command.requestId}`,
      );
    }

    request.reject();

    request.adminComment = command.payload.adminComment;

    await this.repo.save(request);

    this.events.emit('request.reject', request);
  }
}
