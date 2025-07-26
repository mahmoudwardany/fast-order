import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from './repository/restaurant.repository';
import { Restaurant } from './entities/restaurant.entity';
import { EntityManager } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/user-role.enum';
import { AbstractQueryDto } from 'src/shared/abstract-query';

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

  findRestaurantByTenantId(id: number) {
    return this.restaurantRepository.findRestaurantByTenantId(id);
  }

  async findAll(user: User, query: AbstractQueryDto) {
    const { limit = 10, offset = 0 } = query;

    if (user.role === UserRole.ADMIN || user.role === UserRole.CUSTOMER) {
      return this.restaurantRepository.findAllWithPagination(limit, offset);
    }

    if (user.role === UserRole.OWNER) {
      return this.restaurantRepository.findRestaurantByTenantId(user?.id);
    }

    return [];
  }
}
