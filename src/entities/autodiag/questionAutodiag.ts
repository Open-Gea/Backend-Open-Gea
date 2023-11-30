import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionsAutodiag } from '../../models/autodiag/questions-autodiag';

@Entity({ name: 'question_autodiag' })
export class QuestionsAutodiagEntity implements QuestionsAutodiag {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ name: 'question', type: 'varchar', nullable: false })
    question: string;

  @Column({ name: 'category', type: 'varchar', nullable: false })
    category: string;

  @Column({ name: 'required', type: 'boolean', nullable: false})
    required: boolean;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false, default: () => 'now()' })
    createdAt: Date;
}


