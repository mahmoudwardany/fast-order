import { Module } from '@nestjs/common';
import { RestaurantRequestService } from './restaurant-requests.service';
import { RestaurantRequestController } from './restaurant-requests.controller';
import { EmailModule } from 'src/modules/email/email.module';
import { RestaurantRequestRepository } from './repository/resturant-request.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantRequest } from './entities/restaurant_request.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CqrsModule } from '@nestjs/cqrs';
import { RejectRequestHandler } from './commands/handlers/reject-request.handler';
import { ApproveRequestHandler } from './commands/handlers/approve-request.handler';
import { FindAllPendingRequestHandler } from './commands/handlers/find-pending-requests.handler';
import { RequestEventListener } from './events/restaurant-request.event';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([RestaurantRequest]),
    EventEmitterModule.forRoot(),
    CqrsModule,
  ],
  controllers: [RestaurantRequestController],
  providers: [
    RestaurantRequestService,
    RestaurantRequestRepository,
    FindAllPendingRequestHandler,
    RejectRequestHandler,
    ApproveRequestHandler,
    RequestEventListener,
  ],
})
export class RestaurantRequestModule {}
