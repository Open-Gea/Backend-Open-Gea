import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Report, ReportStatus } from '../../models/utils/report';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'reports' })
export class ReportEntity implements Report {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @OneToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    reporter: UserEntity;

  @Column({ name: 'screenshot', type: 'varchar', length: 128, nullable: false })
    screenshot: string;

  @Column({ name: 'date', type: 'timestamp', nullable: false, default: () => 'now()' })
    date: Date;

  @Column({ name: 'status', type: 'enum', enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'], default: 'PENDING' })
    status: ReportStatus;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false, default: () => 'now()' })
    createdAt: Date;
}
