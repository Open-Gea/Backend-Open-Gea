import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { GWP } from '../../models/utils/gwp';

@Entity({ name: 'gwp' })
export class GWPEntity implements GWP {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ name: 'name', type: 'varchar', length: 128, nullable: false })
    name: string;

  @Column({ name: 'formula', type: 'varchar', length: 128, nullable: false })
    formula: string;

  @Column({ name: 'value', type: 'integer', nullable: false })
    value: number;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false, default: () => 'now()' })
    createdAt: Date;

}
