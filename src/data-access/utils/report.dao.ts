import { DataSource } from 'typeorm';

import { ReportEntity } from '../../entities/utils/report.entity';
import { Report } from '../../models/utils/report';
import { ReportRepository } from '../../repositories/utils/report.repository';

export class ReportDAO implements ReportRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }

  async getAll(): Promise<Report[]> {
    const result = await this.connection
      .createQueryBuilder()
      .select('report')
      .from(ReportEntity, 'report')
      .getMany();

    return result ? result as Report[] : [];
  }

  async read(id: string): Promise<Report | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('report')
      .from(ReportEntity, 'report')
      .where('report.id = :id', { id })
      .getOne();

    return result ? result as Report : undefined;
  }

  async update(id: string, item: Report): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(ReportEntity)
      .set(item)
      .where('id = :id', { id })
      .execute();

    return !!result.affected;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(ReportEntity)
      .where('id = :id', { id })
      .execute();

    return !!result.affected;
  }

  async create(item: Report): Promise<Report | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(ReportEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0 ? (result.generatedMaps[0] as Report) : undefined;
  }

  async search(query?: string | undefined): Promise<Report[]> {
    let sql = 'SELECT * FROM report';

    if (query) {
      sql += ` WHERE reporter ILIKE '%${query}%'`;
    }
    const result = await this.connection.manager.query(sql);
    return result ? result as Report[] : [];
  }
}
