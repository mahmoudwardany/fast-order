import { RestaurantRequest } from '../entities/restaurant_request.entity';

export class CreateRequestMapper {
  static toResponse(request: RestaurantRequest) {
    return {
      id: request.id,
      restaurantName: request.restaurantName,
      logo: request.logo,
      status: request.status,
      createdAt: request.createdAt,
      user: {
        id: request.user?.id,
        email: request.user?.email,
      },
    };
  }
}
