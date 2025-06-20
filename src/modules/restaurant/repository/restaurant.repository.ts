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
    return this.repo.findOne({ where: { tenantId: id } });
  }

  getRepo() {
    return this.repo;
  }
}
