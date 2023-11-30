import { StatusCodes } from 'http-status-codes';

import { YvYError } from '../../utils/error';
import { QuestionAutodiagRepository } from '../../repositories/autodiag/questionAutodiag.repository';
import { QuestionsAutodiag } from '../../models/autodiag/questions-autodiag';

export class QuestionsAutodiagService{
  constructor(
    private repository: QuestionAutodiagRepository
  ) { }

  async read(id: string): Promise<QuestionsAutodiag | undefined> {
    return this.repository.read(id);
  }

  async create(item: QuestionsAutodiag): Promise<boolean> {
    if (!(await this.repository.findByName(item.question,item.category))) {
      this.repository.create(item);
      return true;
    }
    throw new YvYError('Question already exist', StatusCodes.BAD_REQUEST,'Question already exist');
  }

  async update(id: string, item: QuestionsAutodiag): Promise<boolean> {
    if (await this.repository.findById(id)) {
      return this.repository.update(id, item);
    }
    throw new YvYError('Question not found', 404,'Question not found');
  }

  async search(query?: string): Promise<QuestionsAutodiag[]> {
    return this.repository.search(query);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async findByName(name: string,category: string): Promise<QuestionsAutodiag | undefined> {
    return this.repository.findByName(name,category);
  }

  async findById(id: string): Promise<QuestionsAutodiag | undefined> {
    return this.repository.findById(id);
  }
}
