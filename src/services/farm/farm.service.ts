import { Farm } from '../../models/farm/farm';
import { FarmRepository } from '../../repositories/farm/farm.repository';
import { YvYError } from '../../utils/error';
import * as fileService from '../utils/documentsService';

export class FarmService {
  constructor(private repository: FarmRepository) { }

  async getAll(): Promise<Farm[]> {
    return this.repository.getAll();
  }

  async getAllByUserId(userId: string): Promise<Farm[]> {
    return this.repository.getAllByUserId(userId);
  }

  async read(id: string): Promise<Farm | undefined> {
    return this.repository.read(id);
  }

  async update(id: string, item: Farm, file: any, res: any): Promise<boolean> {
    const farm = await this.repository.read(id);
  
    if (farm) {
      if (file.file) {
        const uploadFile = await fileService.uploadFile(file, res);
        const newUrlObj = {
          url: uploadFile.data.url,
          file_id: uploadFile.data.file_id,
          filename: uploadFile.data.filename,
          size: uploadFile.data.size,
          fechaCarga: new Date().toLocaleDateString()
        };
        const urlsArray = farm.urls ? [...farm.urls, newUrlObj] : [newUrlObj];        
        item.urls = urlsArray;
      } else {
        item.urls = farm.urls;
      }
      return this.repository.update(id, item);
    }
    throw new YvYError("Farm not found", 404 ,"Farm not found");
  }
  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async create(item: Farm, file: any,res: any): Promise<Farm | undefined> {    
    if(file.file) {
      const uploadFile = await fileService.uploadFile(file,res);
      item.urls = [{
        url: uploadFile.data.url,
        file_id: uploadFile.data.file_id,
        filename: uploadFile.data.filename,
        size: uploadFile.data.size,
        fechaCarga: new Date().toLocaleDateString()
      }];
    }

    return this.repository.create(item);
  }

  async findById(id: string): Promise<Farm | undefined> {
    return this.repository.read(id);
  }
}
