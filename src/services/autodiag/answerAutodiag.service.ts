import { StatusCodes } from 'http-status-codes';

import { YvYError } from '../../utils/error';
import { AnswerAutodiagRepository } from '../../repositories/autodiag/answerAutodiag.repository';
import { AnswersAutodiag } from '../../models/autodiag/answers-autodiag';
import { UserRepository } from '../../repositories/user/user.repository';
import { QuestionAutodiagRepository } from '../../repositories/autodiag/questionAutodiag.repository';
import { FarmRepository } from '../../repositories/farm/farm.repository';
import * as fileService from '../utils/documentsService';

export class AnswersAutodiagService{
  constructor(
    private repository: AnswerAutodiagRepository,
    private userRepository: UserRepository,
    private questionRepository: QuestionAutodiagRepository,
    private farmRepository: FarmRepository
  ) { }

  async read(id: string): Promise<AnswersAutodiag | undefined> {
    return this.repository.read(id);
  }

  async update(id: string, item: AnswersAutodiag): Promise<boolean> {
    if (await this.repository.findById(id)) {
      return this.repository.update(id, item);
    }
    throw new YvYError('Answer not found', 404, 'Answer not found');
  }

  async uploadFile(questionId:string,userId:string,farmId:string,file:any): Promise<boolean> {
    const existedAnswer = await this.findByQuestion(questionId, userId, farmId);

    if (existedAnswer) {
      const fileData = {
        filename: file.filename,
        fileBuffer: file.buffer
      }
      existedAnswer.urls = fileData;      
      return this.repository.update(existedAnswer.id, existedAnswer);
    }
    throw new YvYError('Answer not found', 404, 'Answer not found');
  }
  async create(item: any): Promise<AnswersAutodiag | undefined> {
        
    const userId = (item.user as any) as string;
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new YvYError('User not found', 404, 'User not found');
    }
    
    const farmId = (item.farm as any) as string;
    const farm = await this.farmRepository.findById(farmId);
    if (!farm) {
      throw new YvYError('Farm not found', 404, 'Farm not found');
    }
    
      const answerObject = item.answer
      const questionId = Object.keys(answerObject)[0];
      const question = await this.questionRepository.read(questionId);
      if (!question) {
        throw new YvYError('Question not found', 404, 'Question not found');
      }
      
      item.user = user;
      item.question = question;
      item.farm = farm;      
      item.answer =  Object.values(answerObject)[0];
      delete item.answers;
      delete item.id;
      
      const existedAnswer = await this.findByQuestion(questionId, userId, farmId);
      
      if (existedAnswer) {
        this.repository.update(existedAnswer.id, item);
      } else {
        this.repository.create(item);
      }
    
      return undefined;
  }



  async search(query?: string): Promise<AnswersAutodiag[]> {
    return this.repository.search(query);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }


  async findByQuestion(questionId: string,userId:string,farmId: string): Promise<AnswersAutodiag | undefined> {
    return this.repository.findByQuestion(questionId,userId,farmId);
  }

  async getUserAnswers(userId: string, farmId:string): Promise<any> {
    const categories = await this.questionRepository.getAllCategories();
  
    const userAnswers = await this.repository.findByUserAndFarm(userId, farmId);
  
    let categoryStatus: any[] = [];
    let answers: any = [];
    let totalRequiredQuestions = 0;
    let totalAnsweredRequiredQuestions = 0;
    let totalNonRequiredQuestions = 0;
    let totalAnsweredNonRequiredQuestions = 0;
  
    if (userAnswers) {
      for (const userAnswer of userAnswers) {
        const answersData = {
          id: userAnswer.question.id,
          answer: userAnswer.answer,
          file: userAnswer.urls
        };
        answers.push(answersData);
      }
      for (const category of categories) {
        const { category: categoryName } = category;
      
        const requiredQuestions = await this.questionRepository.getRequiredQuestions(categoryName);
        const nonRequiredQuestions = await this.questionRepository.getNonRequiredQuestions(categoryName);
      
        const answeredRequiredQuestions = userAnswers
          .filter(answer => answer.question && answer.question.category === categoryName && answer.question.required && answer.answer === 'Si')
          .map(answer => ({
            id: answer.question.id,
            question: answer.question.question,
            answer: answer.answer
          }));
      
        const answeredNonRequiredQuestions = userAnswers
          .filter(answer => answer.question && answer.question.category === categoryName && !answer.question.required && answer.answer === 'Si')
          .map(answer => ({
            id: answer.question.id,
            question: answer.question.question,
            answer: answer.answer
          }));
      
        totalRequiredQuestions += requiredQuestions.length;
        totalAnsweredRequiredQuestions += answeredRequiredQuestions.length;
        totalNonRequiredQuestions += nonRequiredQuestions.length;
        totalAnsweredNonRequiredQuestions += answeredNonRequiredQuestions.length;
      
        const hasAllRequiredAnswers = requiredQuestions.every(requiredQuestion => {
          return answeredRequiredQuestions.some(answeredQuestion => answeredQuestion.id === requiredQuestion.id);
        });
      
        const categoryData = {
          categoryName,
          percentageRequired: requiredQuestions.length > 0
          ? Math.floor((answeredRequiredQuestions.length / requiredQuestions.length) * 100)
          : 0,
          percentageNonRequired: nonRequiredQuestions.length > 0
            ? Math.floor((answeredNonRequiredQuestions.length / nonRequiredQuestions.length) * 100)
            : 0
        };
        
        const categories = {
          categoryData
        };
        categoryStatus.push(categories);
      }
    }
  
    const dataReturn = {
      categoryStatus,
      answers,
      percentageNonRequired: totalNonRequiredQuestions > 0 ? (totalAnsweredNonRequiredQuestions / totalNonRequiredQuestions) * 100 : 0
    };
  
    return dataReturn;
  }
}
