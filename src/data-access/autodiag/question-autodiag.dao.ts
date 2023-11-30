import { DataSource } from 'typeorm';

import { QuestionAutodiagRepository } from '../../repositories/autodiag/questionAutodiag.repository';
import { QuestionsAutodiag } from '../../models/autodiag/questions-autodiag';
import { QuestionsAutodiagEntity } from '../../entities/autodiag/questionAutodiag';

export class QuestionAutodiagDAO implements QuestionAutodiagRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }

  async findAll(): Promise<QuestionsAutodiag | undefined> {
    let sql = 'SELECT * FROM question_autodiag'
    const result = await this.connection.manager.query(sql);
    return result ? result as QuestionsAutodiag : undefined;
  }

  extractCriterio(question: string): string {
    const regex = /\[Criterio (\d+(\.\d+)?)\]/;
    const match = regex.exec(question);
    return match ? match[1] : '';
  }

  criterioComparator(a: string, b: string): number {
    const numberA = parseFloat(a);
    const numberB = parseFloat(b);
  
    if (!isNaN(numberA) && !isNaN(numberB)) {
      return numberA - numberB;
    }
  
    return a.localeCompare(b);
  }
  
  
  async search(query?: string): Promise<QuestionsAutodiag[]> {
    let sql = `SELECT * 
                FROM question_autodiag`;
    if (query) {
      sql += `WHERE name ILIKE '%${query}%' 
              OR lastname ILIKE '%${query}%' 
              OR email ILIKE '%${query}%'`;
    }

    const result = await this.connection.manager.query(sql);

    const sortedResult = result
    ? (result as QuestionsAutodiag[]).sort((a, b) => {
        const criterioA = this.extractCriterio(a.category);
        const criterioB = this.extractCriterio(b.category);
        return this.criterioComparator(criterioA, criterioB);
      })
    : [];
  
  return sortedResult;
}

  async getAllCategories(): Promise<any> {
    const result = await this.connection
    .createQueryBuilder()
    .select('DISTINCT question_autodiag.category', 'category')
    .from(QuestionsAutodiagEntity, 'question_autodiag')
    .getRawMany();
    return result
  }

  async getRequiredQuestions(category:string): Promise<any> {
    const result = await this.connection
    .createQueryBuilder()
    .select('question_autodiag')
    .from(QuestionsAutodiagEntity, 'question_autodiag')
    .where('question_autodiag.category = :category', { category })
    .andWhere('question_autodiag.required = :required', { required: true })
    .getMany();    
    return result
  }

  async getNonRequiredQuestions(category:string): Promise<any> {
    const result = await this.connection
    .createQueryBuilder()
    .select('question_autodiag')
    .from(QuestionsAutodiagEntity, 'question_autodiag')
    .where('question_autodiag.category = :category', { category })
    .andWhere('question_autodiag.required = :required', { required: false })
    .getMany();    
    return result
  }

  async findByName(question: string,category: string): Promise<QuestionsAutodiag | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('question_autodiag')
      .from(QuestionsAutodiagEntity, 'question_autodiag')
      .where('question_autodiag.question = :question', { question })
      .andWhere('question_autodiag.category = :category', { category })
      .loadAllRelationIds()
      .getOne();

    return result ? result as QuestionsAutodiag : undefined;
  }

  async findById(id: string): Promise<QuestionsAutodiag | undefined> {
    const result = await this.connection
      .getRepository(QuestionsAutodiagEntity)
      .createQueryBuilder('question_autodiag')
      .where('question_autodiag.id = :id', { id })
      .loadAllRelationIds()
      .getOne();

    return result ? result as QuestionsAutodiag : undefined;
  }

  async create(item: QuestionsAutodiag): Promise<QuestionsAutodiag | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(QuestionsAutodiagEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0 ? (result.generatedMaps[0] as QuestionsAutodiag) : undefined;
  }

  async read(id: string): Promise<QuestionsAutodiag | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('question_autodiag')
      .from(QuestionsAutodiagEntity, 'question_autodiag')
      .where('question_autodiag.id = :id', { id })
      .getOne();

    return result ? result as QuestionsAutodiag : undefined;
  }

  async update(id: string, item: QuestionsAutodiag): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(QuestionsAutodiagEntity)
      .set(item)
      .where('id = :id', { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(QuestionsAutodiagEntity)
      .where('id = :id', { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

}
