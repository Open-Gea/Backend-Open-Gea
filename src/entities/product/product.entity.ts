import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from '../../models/product/product';

@Entity({ name: 'products' })
export class ProductEntity implements Product {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ name: 'name', type: 'varchar', length: 128, nullable: false })
    name: string;

  @Column({ name: 'category', type: 'varchar', length: 128, nullable: false })
    category: string;

  @Column({ name: 'description', type: 'varchar', length: 128, nullable: false })
    description: string;

  @Column({ name: 'crop_stages', type: 'jsonb', nullable: false })
    crop_stages: { dev: number, init: number, late: number, mid: number };

  @Column({ name: 'crop_kc', type: 'jsonb', nullable: false })
    crop_kc: { init: number, mid: number, end: number };

  @Column({ name: 'created_at', type: 'timestamp', nullable: false, default: () => 'now()' })
    createdAt: Date;

}
