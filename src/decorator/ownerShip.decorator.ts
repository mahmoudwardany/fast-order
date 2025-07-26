import { SetMetadata } from '@nestjs/common';

export const OWNERSHIP_KEY = 'ownershipParam';
export const CheckOwnership = (paramName = 'restaurantId') =>
  SetMetadata(OWNERSHIP_KEY, paramName);
