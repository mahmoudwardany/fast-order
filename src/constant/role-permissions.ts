import { UserRole } from 'src/modules/users/user-role.enum';

export const ROLE_PERMISSIONS = {
  [UserRole.OWNER]: [
    'view_item',
    'delete_item',
    'view_restaurant',
    'update_item',
    'restore_item',
    'create_item',
  ],
  [UserRole.CUSTOMER]: ['view_item'],
  [UserRole.ADMIN]: ['view_item', 'delete_item'],
};
