import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { UserEntity } from '../user/user.entity';
  import { FarmEntity } from '../farm/farm.entity';

  @Entity({ name: 'settingqr' })
  export class SettingQrEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

     @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user_id: string;

    @ManyToOne(() => FarmEntity, (user) => user.id, { nullable: false })
    @JoinColumn({ name: 'farm_id', referencedColumnName: 'id' })
    farm_id: string;

    @Column({ name: 'carbon_footprint', type: 'jsonb', nullable: true })
    carbon_footprint: object;

    @Column({ name: 'water_footprint', type: 'jsonb', nullable: true })
    water_footprint: object[];

    @Column({ name: 'environmental_certificates', type: 'jsonb', nullable: true })
    environmental_certificates: object[];

    @Column({ name: 'personal_data_preferences', type: 'jsonb', nullable: true })
    personal_data_preferences: object;

    @Column({
      name: 'created_at',
      type: 'timestamp',
      nullable: false,
      default: () => 'now()',
    })
    created_at: Date;
  }