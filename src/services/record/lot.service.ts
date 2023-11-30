import { Lot } from "../../models/records/lots";
import { RecordRepository } from "../../repositories/record/recordRepository";
import { YvYError } from "../../utils/error";

export class LotService {
  constructor(private repository: RecordRepository<Lot>) {}

  async getAllByUser(userId: string): Promise<Lot[]> {
    return this.repository.getAllByUser(userId);
  }

  async read(lotId: string): Promise<Lot | undefined> {
    return this.repository.read(lotId);
  }

  async update(lotId: string, item: Lot): Promise<boolean> {
    if (await this.repository.read(lotId)) {
      return this.repository.update(lotId, item);
    }
    throw new YvYError("Lot not found", 404,"Lot not found");
  }

  async delete(lotId: string): Promise<boolean> {
    return this.repository.delete(lotId);
  }

  async create(item: Lot): Promise<Lot | undefined> {
    return this.repository.create(item);
  }

  async findById(id: string): Promise<Lot | undefined> {
    return this.repository.read(id);
  }
}
