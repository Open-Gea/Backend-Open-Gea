import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AnswersAutodiag, urls } from '../../models/autodiag/answers-autodiag';
import { User } from '../../models/user/user';
import { UserEntity } from '../user/user.entity';
import { QuestionsAutodiagEntity } from './questionAutodiag';
import { QuestionsAutodiag } from '../../models/autodiag/questions-autodiag';
import { FarmEntity } from '../farm/farm.entity';
import { Farm } from '../../models/farm/farm';

@Entity({ name: 'answer_autodiag' })
export class AnswerAutodiagEntity implements AnswersAutodiag {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ name: 'answer', type: 'varchar', nullable: false })
    answer: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
    user: User;

  @ManyToOne(() => QuestionsAutodiagEntity, (question) => question.id, { nullable: false })
  @JoinColumn({ name: 'question', referencedColumnName: 'id' })
    question: QuestionsAutodiag;

  @ManyToOne(() => FarmEntity, (farm) => farm.id, { nullable: false } )
  @JoinColumn({ name: 'farm', referencedColumnName: 'id' })
    farm: Farm;

  @Column({ name: "urls", type: "jsonb", nullable: true })
    urls: urls | null;
    
  @Column({ name: 'created_at', type: 'timestamp', nullable: false, default: () => 'now()' })
    createdAt: Date;

}


