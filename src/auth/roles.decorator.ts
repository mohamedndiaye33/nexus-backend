import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

// Décorateur à utiliser sur les routes : @Roles('admin')
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
