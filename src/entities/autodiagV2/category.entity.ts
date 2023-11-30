import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryAutodiag } from '../../models/autodiagV2/category';

@Entity({ name: 'category_autodiag' })
export class CategoryAutodiagEntity implements CategoryAutodiag {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', type: 'varchar', nullable: false })
    name: string;
    
    @Column({ name: 'description', type: 'varchar', nullable: false })
    description: string;
    
    @Column({ name: 'rule', type: 'varchar', nullable: false })
    rule: string;

    @Column({ name: 'created_at', type: 'timestamp', nullable: false, default: () => 'now()' })
    createdAt: Date;
}


