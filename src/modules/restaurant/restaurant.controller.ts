import { Controller, UseGuards, Get, Req, Query } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { RestaurantService } from './restaurant.service';
import { Permission } from 'src/decorator/permission.decorator';
import { CheckOwnership } from 'src/decorator/ownerShip.decorator';
import { AbstractQueryDto } from 'src/shared/abstract-query';

@Controller('restaurant')
@UseGuards(AuthGuard, PermissionGuard)
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  @Permission('view_restaurant')
  async findAll(@Req() req, @Query() query: AbstractQueryDto) {
    return this.restaurantService.findAll(req.user, query);
  }
}
