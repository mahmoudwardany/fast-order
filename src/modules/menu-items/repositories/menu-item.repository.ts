import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuItem } from '../entities/menu-item.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateMenuItemsDto } from '../dto/create-menu-items.dto';
import {
  RestaurantIdParamDto,
  RestaurantItemParamDto,
} from '../dto/menu-items-query.dto';
import { AbstractQueryDto } from 'src/shared/abstract-query';
import { EditRestaurantItemDto } from '../dto/edit-menu-items.dto';

@Injectable()
export class MenuItemsRepository {
  constructor(
    @InjectRepository(MenuItem)
    private repo: Repository<MenuItem>,
  ) {}
  async create(data: CreateMenuItemsDto) {
    return await this.repo.save(this.repo.create(data));
  }

  findAll(query: AbstractQueryDto, params: RestaurantIdParamDto) {
    return this.repo.find({
      where: { restaurantId: params.restaurantId },
      take: query.limit,
      skip: query.offset,
    });
  }

  async findItem(params: RestaurantItemParamDto): Promise<MenuItem> {
    const item = await this.repo.findOne({
      where: {
        restaurantId: params.restaurantId,
        id: params.itemId,
        deletedAt: IsNull(),
      },
    });
    if (!item) throw new NotFoundException('Menu item not found');
    return item;
  }

  async deleteItem(params: RestaurantItemParamDto): Promise<void> {
    await this.findActiveItem(params);
    await this.repo.softDelete({
      restaurantId: params.restaurantId,
      id: params.itemId,
    });
  }

  async restoreItem(params: RestaurantItemParamDto): Promise<void> {
    const item = await this.repo.findOne({
      where: { restaurantId: params.restaurantId, id: params.itemId },
      withDeleted: true,
    });

    if (!item) throw new NotFoundException('Menu item not found');
    if (!item.deletedAt) throw new BadRequestException('Item is not deleted');

    await this.repo.restore({
      restaurantId: params.restaurantId,
      id: params.itemId,
    });
  }

  async editItem(params: RestaurantItemParamDto, dto: EditRestaurantItemDto) {
    const item = await this.findActiveItem(params);
    Object.assign(item, dto);
    return await this.repo.save(item);
  }

  private async findActiveItem(
    params: RestaurantItemParamDto,
  ): Promise<MenuItem> {
    const item = await this.repo.findOne({
      where: {
        restaurantId: params.restaurantId,
        id: params.itemId,
        deletedAt: IsNull(),
      },
    });
    if (!item)
      throw new NotFoundException('Menu item not found or already deleted');
    return item;
  }
}
