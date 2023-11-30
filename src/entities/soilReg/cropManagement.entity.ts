import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { User } from '../../models/user/user';
import { CropManagement } from '../../models/soilReg/CropManagement';

@Entity({ name: 'cropmanagement' })
export class CropManagementEntity implements CropManagement {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 4, nullable: true })
  year: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lot: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  speciesToCultivate: string;

  @Column({ type: 'date', nullable: true })
  plantingDate: Date;

  @Column({ type: 'date', nullable: true })
  harvestDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  precedingSpecies: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  targetMarket: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  tasks: string;

  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @Column({ type: 'text', nullable: true })
  notesObservations: string;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  personInCharge: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  goal: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user: User;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'now()',
  })
    createdAt: Date;

  
}
