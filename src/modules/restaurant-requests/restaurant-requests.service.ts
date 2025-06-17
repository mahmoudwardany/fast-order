import { Injectable } from '@nestjs/common';
import { CreateRestaurantRequestDto } from './dto/create-restaurant.dto';
import { RestaurantRequestRepository } from './repository/resturant-request.repository';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApproveRequestCommand } from './commands/approve-request.command';
import { RejectRequestCommand } from './commands/reject-request.command';
import { FindPendingRequestsCommand } from './commands/find-pending-requests.command';
import { AdminCommentDto } from './dto/admin-comment.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RestaurantRequestService {
  constructor(
    private readonly repo: RestaurantRequestRepository,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async create(dto: CreateRestaurantRequestDto, user: User) {
    return this.repo.create({ ...dto, user });
  }

  approve(id: number) {
    return this.commandBus.execute(new ApproveRequestCommand(id));
  }

  reject(id: number, payload: AdminCommentDto) {
    return this.commandBus.execute(new RejectRequestCommand(id, payload));
  }

  findPendingRequests() {
    return this.queryBus.execute(new FindPendingRequestsCommand());
  }
}
