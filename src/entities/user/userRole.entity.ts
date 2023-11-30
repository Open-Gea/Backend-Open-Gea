import { Entity, PrimaryColumn } from 'typeorm';

import { UserRole } from '../../models/user/user';

@Entity({ name: 'user_role', synchronize: false })
export class UserRoleEntity {
  @PrimaryColumn({ name: 'id', type: 'varchar', length: 16, nullable: false })
    id: UserRole;
}
