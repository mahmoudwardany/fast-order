import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './entities/menu-item.entity';
import { MenuItemsController } from './menu-item.controller';
import { MenuItemsRepository } from './repositories/menu-item.repository';
import { MenuItemService } from './menu-items.service';
import { RestaurantModule } from '../restaurant/restaurant.module';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem]), RestaurantModule],
  controllers: [MenuItemsController],
  providers: [MenuItemsRepository, MenuItemService],
})
export class MenuItemsModule {}
