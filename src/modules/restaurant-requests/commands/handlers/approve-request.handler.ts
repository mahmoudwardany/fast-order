import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RestaurantService } from 'src/modules/restaurant/restaurant.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DataSource } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ApproveRequestCommand } from '../approve-request.command';
import { RestaurantRequestRepository } from '../../repository/resturant-request.repository';

@CommandHandler(ApproveRequestCommand)
export class ApproveRequestHandler
  implements ICommandHandler<ApproveRequestCommand>
{
  constructor(
    private readonly repo: RestaurantRequestRepository,
    private readonly restaurantService: RestaurantService,
    private readonly event: EventEmitter2,
    private readonly dataSource: DataSource,
  ) {}

  async execute(command: ApproveRequestCommand) {
    const request = await this.repo.findById(command.requestId);

    if (!request) {
      throw new NotFoundException(
        `No restaurant request found with ID ${command.requestId}`,
      );
    }

    await this.dataSource.transaction(async (manager) => {
      request.approve();
      await manager.save(request);

      await this.restaurantService.createRestaurant(
        {
          tenantId: request.user.id,
          name: request.restaurantName,
          logo: request.logo,
          address: request.address,
        },
        manager,
      );

      this.event.emit('request.approved', request);
    });
  }
}
