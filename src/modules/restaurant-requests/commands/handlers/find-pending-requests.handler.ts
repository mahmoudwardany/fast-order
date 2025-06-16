import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPendingRequestsCommand } from '../find-pending-requests.command';
import { RestaurantRequestRepository } from '../../repository/resturant-request.repository';

@QueryHandler(FindPendingRequestsCommand)
export class FindAllPendingRequestHandler
  implements ICommandHandler<FindPendingRequestsCommand>
{
  constructor(private readonly repo: RestaurantRequestRepository) {}

  async execute(_: FindPendingRequestsCommand) {
    return await this.repo.findAllPending();
  }
}
