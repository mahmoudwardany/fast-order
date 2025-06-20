import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from './repository/restaurant.repository';
import { Restaurant } from './entities/restaurant.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class RestaurantService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async createRestaurant(data: Partial<Restaurant>, manager?: EntityManager) {
    const repo = manager
      ? manager.getRepository(Restaurant)
      : this.restaurantRepository.getRepo();

    const restaurant = repo.create(data);
    return repo.save(restaurant);
  }

  async findRestaurantByTenantId(id: number) {
    return this.restaurantRepository.findRestaurantByTenantId(id);
  }
}
