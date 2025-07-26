import { Injectable } from '@nestjs/common';
import { MenuItemsRepository } from './repositories/menu-item.repository';
import { CreateMenuItemsDto } from './dto/create-menu-items.dto';
import {
  RestaurantIdParamDto,
  RestaurantItemParamDto,
} from './dto/menu-items-query.dto';
import { AbstractQueryDto } from 'src/shared/abstract-query';
import { EditRestaurantItemDto } from './dto/edit-menu-items.dto';
import { MenuItem } from './entities/menu-item.entity';

@Injectable()
export class MenuItemService {
  constructor(private readonly repository: MenuItemsRepository) {}

  create(data: CreateMenuItemsDto): Promise<MenuItem> {
    return this.repository.create(data);
  }

  findAll(
    query: AbstractQueryDto,
    params: RestaurantIdParamDto,
  ): Promise<MenuItem[]> {
    return this.repository.findAll(query, params);
  }

  findItem(params: RestaurantItemParamDto): Promise<MenuItem> {
    return this.repository.findItem(params);
  }

  deleteItem(params: RestaurantItemParamDto): Promise<void> {
    return this.repository.deleteItem(params);
  }

  restoreItem(params: RestaurantItemParamDto): Promise<void> {
    return this.repository.restoreItem(params);
  }

  editItem(
    params: RestaurantItemParamDto,
    dto: EditRestaurantItemDto,
  ): Promise<MenuItem> {
    return this.repository.editItem(params, dto);
  }
}
