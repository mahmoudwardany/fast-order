import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantRepository {
  constructor(
    @InjectRepository(Restaurant)
    private repo: Repository<Restaurant>,
  ) {}
  async createRestaurant(data: Partial<Restaurant>) {
    return this.repo.save(this.repo.create(data));
  }

  async findRestaurantByTenantId(id: number) {
    return this.repo.findOneBy({ tenantId: id });
  }

  async findAllWithPagination(limit: number, offset: number) {
    return this.repo.find({
      skip: offset,
      take: limit,
    });
  }

  getRepo() {
    return this.repo;
  }
}
