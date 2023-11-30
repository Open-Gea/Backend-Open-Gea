import { DataSource } from 'typeorm';

import { AnswerAutodiagRepository } from '../../repositories/autodiag/answerAutodiag.repository';
import { AnswersAutodiag } from '../../models/autodiag/answers-autodiag';
import { AnswerAutodiagEntity } from '../../entities/autodiag/answerAutodiag';

export class AnswerAutodiagDAO implements AnswerAutodiagRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }

  async findAll(): Promise<AnswersAutodiag | undefined> {
    let sql = 'SELECT * FROM answer_autodiag'
    const result = await this.connection.manager.query(sql);
    return result ? result as AnswersAutodiag : undefined;
  }

  async search(query?: string): Promise<AnswersAutodiag[]> {
    let sql = `SELECT * 
                FROM answer_autodiag`;
    if (query) {
      sql += `WHERE name ILIKE '%${query}%' 
              OR lastname ILIKE '%${query}%' 
              OR email ILIKE '%${query}%'`;
    }
    const result = await this.connection.manager.query(sql);

    return result ? result as AnswersAutodiag[] : [];
  }

  async findByUserAndFarm(userId: string,farmId: string): Promise<AnswersAutodiag[] | undefined> {
  
    const result = await this.connection
      .createQueryBuilder()
      .select('answer_autodiag')
      .from(AnswerAutodiagEntity, 'answer_autodiag')
      .leftJoinAndSelect('answer_autodiag.question', 'question')
      .where('answer_autodiag.user = :userId', { userId })
      .andWhere('answer_autodiag.farm = :farmId', {farmId})
      .getMany();
  
    return result as AnswersAutodiag[];
  }
  async findById(id: string): Promise<AnswersAutodiag | undefined> {
    const result = await this.connection
      .getRepository(AnswerAutodiagEntity)
      .createQueryBuilder('answer_autodiag')
      .where('answer_autodiag.id = :id', { id })
      .loadAllRelationIds()
      .getOne();

    return result ? result as AnswersAutodiag : undefined;
  }

  async findByQuestion(questionId: string,userId:string,farmId:string): Promise<AnswersAutodiag | undefined> {
    const result = await this.connection
      .getRepository(AnswerAutodiagEntity)
      .createQueryBuilder('answer_autodiag')
      .where('answer_autodiag.question = :questionId', { questionId })
      .andWhere('answer_autodiag.user = :userId', { userId })
      .andWhere('answer_autodiag.farm = :farmId', { farmId })
      .loadAllRelationIds()
      .getOne();

    return result ? result as AnswersAutodiag : undefined;
  }

  async create(item: AnswersAutodiag): Promise<AnswersAutodiag | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(AnswerAutodiagEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0 ? (result.generatedMaps[0] as AnswersAutodiag) : undefined;
  }

  async read(id: string): Promise<AnswersAutodiag | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('answer_autodiag')
      .from(AnswerAutodiagEntity, 'answer_autodiag')
      .where('answer_autodiag.id = :id', { id })
      .getOne();

    return result ? result as AnswersAutodiag : undefined;
  }

  async update(id: string, item: AnswersAutodiag): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(AnswerAutodiagEntity)
      .set(item)
      .where('id = :id', { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(AnswerAutodiagEntity)
      .where('id = :id', { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

}
