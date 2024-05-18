// dashboard/dto/change-role.dto.ts

import { RoleType } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class ChangeRoleDto {
  @IsEnum(RoleType)
  newRole: RoleType;
}

export class servicesDto{
  
}
