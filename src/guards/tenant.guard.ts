import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { RestaurantService } from '../modules/restaurant/restaurant.service';

export class TenantGuard implements CanActivate {
  constructor(private restaurantService: RestaurantService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const restaurantId = parseInt(
      request.params.id || request?.params?.restaurantId,
    );
    if (!isNaN(restaurantId)) {
      throw new ForbiddenException('Invalid restaurant ID');
    }
    const restaurant =
      await this.restaurantService.findRestaurantByTenantId(restaurantId);

    if (!restaurant && restaurant.tenantId !== user?.id) {
      throw new ForbiddenException('Access denied to this restaurant data');
    }

    return true;
  }
}
