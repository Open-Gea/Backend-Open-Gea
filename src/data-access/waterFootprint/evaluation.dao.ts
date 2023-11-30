import { DataSource } from 'typeorm';

import { EvaluationEntity } from '../../entities/waterFootprint/evaluationEntity';
import { Evaluation, EvaluationStatus } from '../../models/waterFootprint/evaluation';
import { EvaluationRepository } from '../../repositories/waterFootprint/evaluation.repository';

export class EvaluationDAO implements EvaluationRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }

  async findAll(): Promise<Evaluation | undefined> {
    let sql = 'SELECT * FROM evaluations'
    const result = await this.connection.manager.query(sql);
    return result ? result as Evaluation : undefined;
  }

  async findByFilter(filter: string, filterType: string): Promise<Evaluation[]> {
    const sql = `SELECT * FROM evaluations WHERE ${filterType} ILIKE '%${filter}%'`;
    const result = await this.connection.manager.query(sql);
    return result || [];
  }

  async acceptOrReject(id: string, status: string): Promise<boolean> {
    if (status.toUpperCase() === 'REJECTED') {
      const result = await this.connection
        .createQueryBuilder()
        .update(EvaluationEntity)
        .set({ status: EvaluationStatus.REJECTED })
        .where('id = :id', { id })
        .execute();

      return result.affected ? result.affected > 0 : false;
    }
    const result = await this.connection
      .createQueryBuilder()
      .update(EvaluationEntity)
      .set({ status: EvaluationStatus.APPROVED })
      .where('id = :id', { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

  async create(item: Evaluation): Promise<Evaluation | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(EvaluationEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0 ? (result.generatedMaps[0] as Evaluation) : undefined;
  }

  async read(id: string): Promise<Evaluation | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('evaluation')
      .from(EvaluationEntity, 'evaluation')
      .leftJoinAndSelect('evaluation.product', 'product')
      .where('evaluation.id = :id', { id })
      .getOne();

    return result ? result as Evaluation : undefined;
  }

  async update(id: string, item: Evaluation): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(EvaluationEntity)
      .set(item)
      .where('id = :id', { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(EvaluationEntity)
      .where('id = :id', { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

  async deleteByFarm(farm: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(EvaluationEntity)
      .where('farm = :farm', { farm })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }


  async findByUserAndFarm(user: string, farm: string): Promise<Evaluation[]> {
    const result = await this.connection
      .createQueryBuilder()
      .select('evaluation')
      .from(EvaluationEntity, 'evaluation')
      .where('evaluation.user = :user AND evaluation.farm = :farm', { user, farm })
      .getMany();

    return result || [];
  }

  async findByUserAndFarmV2(user: string, farm: string): Promise<Evaluation[]> {
    const result = await this.connection
      .createQueryBuilder()
      .select('evaluation')
      .from(EvaluationEntity, 'evaluation')
      .where('evaluation.user = :user AND evaluation.farm = :farm', { user, farm })
      .leftJoinAndSelect('evaluation.product', 'product')
      .getMany();

    return result || [];
  }

  async findByYear(year: string, farm: string, user: string): Promise<(Evaluation & { productName: string })[]> {
    const result = await this.connection
      .createQueryBuilder()
      .select(['evaluation', 'product.name as productName'])
      .from(EvaluationEntity, 'evaluation')
      .innerJoin('evaluation.product', 'product')
      .where('evaluation.user = :user AND evaluation.farm = :farm AND EXTRACT(YEAR FROM evaluation.end_date) = :year', { user, farm, year })
      .getRawMany();

    return result || [];
  }
  

}
