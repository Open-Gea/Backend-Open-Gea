import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Cooperatives } from '../../models/userCooperative/cooperatives';
import { Exclude } from "class-transformer";
import { UserStatus } from '../../models/user/user';


@Entity({ name: 'cooperatives' })
export class CooperativesEntity implements Cooperatives {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'status', type: 'varchar', nullable: false, default: UserStatus.ACTIVE  })
  status: UserStatus;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'country', type: 'varchar', nullable: false })
  country: string;

  @Column({ name: 'email', type: 'varchar', length: 128, nullable: false })
  email: string;

  @Column({ name: 'profile_picture', type: 'bytea', nullable: true })
  profile_picture: Buffer;

  @Column({ name: 'description', type: 'varchar', length: 128, nullable: true })
  description: string;

  @Column({ name: 'acceptedTermsConditions', type: 'boolean', nullable: false, default: true })
  acceptedTermsConditions: boolean;

  @Exclude()
  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'resetToken', type: 'varchar', length: 128, nullable: true })
  resetToken: string;

  @Column({ name: 'resetTokenExpires', type: 'timestamp', nullable: true })
  resetTokenExpires: Date;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false, default: () => 'now()' })
  createdAt: Date;

}
