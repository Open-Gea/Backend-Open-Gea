import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionAutodiagV2 } from '../../models/autodiagV2/question';
import { CategoryAutodiagEntity } from './category.entity';

@Entity({ name: 'question_autodiag_v2' })
export class QuestionAutodiagEntityV2 implements QuestionAutodiagV2 {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'question', type: 'varchar', nullable: false })
    question: string;

    @ManyToOne(() => CategoryAutodiagEntity, (cat) => cat.id, { nullable: false })
    @JoinColumn({ name: 'category', referencedColumnName: 'id' })
    category: CategoryAutodiagEntity;

    @Column({ name: 'rule', type: 'varchar', nullable: false })
    rule: string;

    @Column({ name: 'required', type: 'boolean', nullable: false})
    required: boolean;

    @Column({ name: 'created_at', type: 'timestamp', nullable: false, default: () => 'now()' })
    createdAt: Date;
}


