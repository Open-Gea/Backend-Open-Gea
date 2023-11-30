import { QuestionsAutodiag } from '../../models/autodiag/questions-autodiag';
import { ICRUD } from '../utils/interfaces/ICRUD';
import { ISearch } from '../utils/interfaces/ISearch';

export interface QuestionAutodiagRepository extends ICRUD<QuestionsAutodiag>, ISearch<QuestionsAutodiag> {
  findAll(): Promise <QuestionsAutodiag | undefined>;
  findByName(question: string,category:string): Promise<QuestionsAutodiag | undefined>;
  findById(id: string): Promise<QuestionsAutodiag | undefined>;
  getAllCategories(): Promise<any | undefined>;
  getRequiredQuestions(category:string):Promise<any | undefined>;
  getNonRequiredQuestions(category:string):Promise<any | undefined>;

}
