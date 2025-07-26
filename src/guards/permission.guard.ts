import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_PERMISSIONS } from 'src/constant/role-permissions';
import { OWNERSHIP_KEY } from 'src/decorator/ownerShip.decorator';
import { PERMISSION_KEY } from 'src/decorator/permission.decorator';
import { UserRole } from 'src/modules/users/user-role.enum';
import { RestaurantService } from '../modules/restaurant/restaurant.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly restaurantService: RestaurantService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, body, params } = request;

    this.checkPermission(context, user);
    await this.checkOwnership(context, user, body, params);

    return true;
  }

  private checkPermission(context: ExecutionContext, user: any) {
    const requiredPermission = this.reflector.get<string>(
      PERMISSION_KEY,
      context.getHandler(),
    );

    if (!requiredPermission) return;

    const userPermissions = ROLE_PERMISSIONS[user.role as UserRole] || [];

    if (!userPermissions.includes(requiredPermission)) {
      throw new ForbiddenException(
        'You do not have permission to perform this action',
      );
    }
  }

  private async checkOwnership(
    context: ExecutionContext,
    user: any,
    body: any,
    params: any,
  ) {
    const ownershipParam = this.reflector.get<string>(
      OWNERSHIP_KEY,
      context.getHandler(),
    );

    if (!ownershipParam || user.role !== UserRole.OWNER) return;

    const restaurantId = body?.restaurantId ?? params?.restaurantId;
    if (!restaurantId) {
      throw new ForbiddenException(`Missing ${ownershipParam} parameter`);
    }

    const restaurant =
      await this.restaurantService.findRestaurantByTenantId(restaurantId);
    if (!restaurant || restaurant.tenantId !== user.id) {
      throw new ForbiddenException(
        'You can only operate on your own restaurant resource',
      );
    }
  }
}
