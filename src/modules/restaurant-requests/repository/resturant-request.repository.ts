import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantRequest } from '../entities/restaurant_request.entity';
import { Repository } from 'typeorm';
import { RequestStatus } from 'src/utils/enum/request-status.enum';
import { CreateRequestMapper } from '../dto/create-restaurant.response';

@Injectable()
export class RestaurantRequestRepository {
  constructor(
    @InjectRepository(RestaurantRequest)
    private repo: Repository<RestaurantRequest>,
  ) {}
  async create(data: Partial<RestaurantRequest>) {
    const savedRequest = await this.repo.save(
      this.repo.create({ ...data, status: RequestStatus.PENDING }),
    );

    return CreateRequestMapper.toResponse(savedRequest);
  }

  findById(id: number) {
    return this.repo.findOne({
      where: { id, status: RequestStatus.PENDING },
      relations: ['user'],
    });
  }

  findAllPending() {
    return this.repo.find({
      where: { status: RequestStatus.PENDING },
      relations: ['user'],
    });
  }

  save(request: RestaurantRequest) {
    return this.repo.save(request);
  }
}
