import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn  } from 'typeorm';

import { User, UserRole, UserStatus } from '../../models/user/user';

import { UserRoleEntity } from './userRole.entity';

import { UserStatusEntity } from './userStatus.entity';


@Entity({ name: 'users' })
export class UserEntity implements User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 128, nullable: false })
  name: string;

  @Column({ name: 'last_name', type: 'varchar', length: 128, nullable: false })
  lastname: string;

  @Column({ name: 'phone', type: 'varchar', length: 64, nullable: false })
  phone: string;

  @Column({ name: 'country', type: 'varchar', length: 64, nullable: false })
  country: string;

  @Column({ name: 'email', type: 'varchar', length: 128, nullable: false })
  email: string;

  @Column({ name: 'user_name', type: 'varchar', length: 64, nullable: false })
  username: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @ManyToOne(() => UserRoleEntity, (role) => role.id, { nullable: false })
  @JoinColumn({ name: 'role', referencedColumnName: 'id' })
  role: UserRole;


  // By default, it assumes it is a new user, so this column is set to true.
  // Note: migrated legacy users must have this value set to false by default!
  @Column({ name: 'accepted_terms_conditions', type: 'boolean', nullable: false, default: true })
  acceptedTermsConditions: boolean;

  @ManyToOne(() => UserStatusEntity, (status) => status.id, { nullable: false })
  @JoinColumn({ name: 'status', referencedColumnName: 'id' })
  status: UserStatus;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false, default: () => 'now()' })
  createdAt: Date;

  @Column({ name: 'reset_token', type: 'varchar', length: 128, nullable: true })
  resetToken: string;

  @Column({ name: 'reset_token_expires', type: 'timestamp', nullable: true })
  resetTokenExpires: Date;

  @Column({ name: 'description', type: 'varchar', length: 128, nullable: true })
  description: string;

  @Column({ name: 'profile_picture', type: 'bytea', nullable: true })
  profile_picture: Buffer;

}
