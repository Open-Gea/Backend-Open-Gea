import { Report } from '../../models/utils/report';
import { ReportRepository } from '../../repositories/utils/report.repository';
import { YvYError } from '../../utils/error';

export class ReportService {
  constructor(private repository: ReportRepository) { }

  async getAll(): Promise<Report[]> {
    return this.repository.getAll();
  }

  async read(id: string): Promise<Report | undefined> {
    return this.repository.read(id);
  }

  async update(id: string, item: Report): Promise<boolean> {
    if (await this.repository.read(id)) {
      return this.repository.update(id, item);
    }
    throw new YvYError('Report not found', 404,'Report not found');
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async create(item: Report): Promise<Report | undefined> {
    return this.repository.create(item);
  }

  async findById(id: string): Promise<Report | undefined> {
    return this.repository.read(id);
  }

  async search(query: string): Promise<Report[]> {
    return this.repository.search(query);
  }
}
