import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MenuItemService } from './menu-items.service';
import { CreateMenuItemsDto } from './dto/create-menu-items.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/decorator/permission.decorator';
import { CheckOwnership } from 'src/decorator/ownerShip.decorator';
import {
  RestaurantIdParamDto,
  RestaurantItemParamDto,
} from './dto/menu-items-query.dto';
import { AbstractQueryDto } from 'src/shared/abstract-query';
import { EditRestaurantItemDto } from './dto/edit-menu-items.dto';

@Controller('menu-items')
@UseGuards(AuthGuard, PermissionGuard)
export class MenuItemsController {
  constructor(private readonly menuItemService: MenuItemService) {}
  @Post()
  @Permission('create_item')
  @CheckOwnership()
  create(@Body() payload: CreateMenuItemsDto) {
    return this.menuItemService.create(payload);
  }

  @Get(':restaurantId')
  @Permission('view_item')
  @CheckOwnership()
  findAll(
    @Query() query: AbstractQueryDto,
    @Param() params: RestaurantIdParamDto,
  ) {
    return this.menuItemService.findAll(query, params);
  }

  @Get(':restaurantId/:itemId')
  @Permission('view_item')
  @CheckOwnership()
  findItem(@Param() params: RestaurantItemParamDto) {
    return this.menuItemService.findItem(params);
  }

  @Delete(':restaurantId/:itemId')
  @Permission('delete_item')
  @CheckOwnership()
  async deleteItem(@Param() params: RestaurantItemParamDto) {
    await this.menuItemService.deleteItem(params);
    return { message: 'Item deleted successfully' };
  }

  @Patch(':restaurantId/:itemId/restore')
  @Permission('restore_item')
  @CheckOwnership()
  async restoreItem(@Param() params: RestaurantItemParamDto) {
    await this.menuItemService.restoreItem(params);
    return { message: 'Item restored successfully' };
  }

  @Patch(':restaurantId/:itemId')
  @Permission('update_item')
  @CheckOwnership()
  editItem(
    @Param() params: RestaurantItemParamDto,
    @Body() dto: EditRestaurantItemDto,
  ) {
    return this.menuItemService.editItem(params, dto);
  }
}
