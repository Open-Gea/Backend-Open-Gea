import { AnswersAutodiag } from '../../models/autodiag/answers-autodiag';
import { ICRUD } from '../utils/interfaces/ICRUD';
import { ISearch } from '../utils/interfaces/ISearch';

export interface AnswerAutodiagRepository extends ICRUD<AnswersAutodiag>, ISearch<AnswersAutodiag> {
  findAll(): Promise <AnswersAutodiag | undefined>;
  findByUserAndFarm(userId: string, farmId: string): Promise<AnswersAutodiag[] | undefined>;
  findById(id: string): Promise<AnswersAutodiag | undefined>;
  findByQuestion(questionId: string,userId: string,farmId: string): Promise<AnswersAutodiag | undefined>;
}
