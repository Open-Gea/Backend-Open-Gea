import { Entity, PrimaryColumn } from 'typeorm';

import { UserStatus } from '../../models/user/user';

@Entity({ name: 'user_status', synchronize: false })
export class UserStatusEntity {
  @PrimaryColumn({ name: 'id', type: 'varchar', length: 16, nullable: false })
    id: UserStatus;
}
