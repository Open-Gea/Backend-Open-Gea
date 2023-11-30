import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { UserEntity } from '../user/user.entity';

  @Entity({ name: 'media' })
  export class MediaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'type', type: 'varchar', length: 16, nullable: false })
    type: 'image' | 'video';

    @Column({ name: 'file_data', type: 'bytea', nullable: false })
    file_data: Buffer;

    @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user_id: string;

    @Column({
      name: 'created_at',
      type: 'timestamp',
      nullable: false,
      default: () => 'now()',
    })
    created_at: Date;
  }  