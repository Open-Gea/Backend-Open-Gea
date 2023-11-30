import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AnswerAutodiagV2 } from '../../models/autodiagV2/answer';
import { UserEntity } from '../user/user.entity';
import { User } from '../../models/user/user';
import { QuestionAutodiagEntityV2 } from './question.entity';
import { QuestionAutodiagV2 } from '../../models/autodiagV2/question';
import { FarmEntity } from '../farm/farm.entity';
import { Farm, urls } from '../../models/farm/farm';


@Entity({ name: 'answer_autodiag_v2' })
export class AnswerAutodiagEntityV2 implements AnswerAutodiagV2 {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ name: 'answer', type: 'varchar', nullable: false })
    answer: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    userId: User;

  @ManyToOne(() => QuestionAutodiagEntityV2, (question) => question.id, { nullable: false })
  @JoinColumn({ name: 'question', referencedColumnName: 'id' })
    question: QuestionAutodiagV2;

  @ManyToOne(() => FarmEntity, (farm) => farm.id, { nullable: false } )
  @JoinColumn({ name: 'farm_id', referencedColumnName: 'id' })
    farmId: Farm;

  @Column({ name: "urls", type: "jsonb", nullable: true })
    urls: urls[] | null;
    
  @Column({ name: 'created_at', type: 'timestamp', nullable: false, default: () => 'now()' })
    createdAt: Date;

}


