import { GenericService } from "../utils/generic.service";
import { AnswerAutodiagV2, CategoryAnswer, QuestionAndAnswer} from "../../models/autodiagV2/answer"
import { AnswerAutodiagRepositoryV2 } from "../../repositories/autodiagV2/answer.repository";
import { GenericRepo } from "../../repositories/utils/generic.repo";
import { CategoryAutodiagEntity } from "../../entities/autodiagV2/category.entity";
import { GenericDAOV2 } from "../../data-access/utils/generic.dao";
import { QuestionAutodiagEntityV2 } from "../../entities/autodiagV2/question.entity";
import { DataSource } from "typeorm";

export default class AnswerAutodiagServiceV2 extends GenericService<AnswerAutodiagV2> {
   
  private questionRepo: GenericRepo<QuestionAutodiagEntityV2>
  private categoryRepo: GenericRepo<CategoryAutodiagEntity>
  constructor(private answerRepository: AnswerAutodiagRepositoryV2) {
    super(answerRepository);
    this.questionRepo = new GenericDAOV2(QuestionAutodiagEntityV2);
    this.categoryRepo = new GenericDAOV2(CategoryAutodiagEntity);
  }
  async getAllByUser(userId: string): Promise<AnswerAutodiagV2[]>{
    return await this.answerRepository.getAllByUser(userId)
  }

  async getAllByUserByRule(userId: string, rule: string, farmId?: string): Promise<AnswerAutodiagV2[]>{
    return (await this.answerRepository.getAllByUser(userId)).filter(answer => answer.question.rule === rule && (farmId ? answer.farmId.id === farmId : true))

  }

  async getAnswersGroupByCategory(userId: string, rule: string, farmId?: string): Promise<CategoryAnswer[]>{
      const answers = await this.getAllByUserByRule(userId, rule, farmId);
      const questions = (await this.questionRepo.search()).filter(q => q.rule === rule);
      const categories = (await this.categoryRepo.search()).filter(q => q.rule === rule);
      
      const result : CategoryAnswer[] = [];
      for(let i =0; i<categories.length; i++){
        
        let questionsByCategory = questions.filter(q => q.category.id === categories[i].id);
        
        let questionsAndAnswers = groupQuestionsAndAnswers(questionsByCategory, answers)
        
        result.push({
          category: categories[i],
          questionsAndAnswers,
          ...calculatePercentage(questionsAndAnswers)
        })
      }


      return result;
  }

}

function groupQuestionsAndAnswers(questions: QuestionAutodiagEntityV2[], answers: AnswerAutodiagV2[]){
  const questionsAndAnswers: QuestionAndAnswer[] = [];
  questions.forEach(q => {
    let answerQ = answers.find(a => a.question.id === q.id);
    questionsAndAnswers.push({
      question: {id: q.id, question: q.question, required: q.required},
      answer: answerQ ? {id: answerQ.id, answer: answerQ.answer, urls: answerQ.urls } : undefined, 
      completed: answerQ? true : false})
  });

  return questionsAndAnswers;
}

function calculatePercentage(questionsAndAnswers: QuestionAndAnswer[]){
  let minCount = 0;
  let desirableCount = 0;
  let totalMin = questionsAndAnswers.filter(QA => QA.question.required).length;
  let totalDesirable = questionsAndAnswers.length - totalMin;
  
  questionsAndAnswers.forEach(QA => {
    if(QA.question.required){
      if(QA.answer?.answer === 'YES') minCount ++;
    }
    else{
      if(QA.answer?.answer === 'YES') desirableCount ++;
    }
  });

  return {
          minCompletedPercentage: Math.round((minCount/totalMin)*100),
          desirableCompletedPercentage: totalDesirable > 0 ? Math.round((desirableCount/totalDesirable)*100) : 0
        }
}