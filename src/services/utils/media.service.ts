import { Media } from '../../models/utils/media';
import { MediaRepository } from '../../repositories/utils/media.repository';

export class MediaService {
  constructor(private repository: MediaRepository) { }


  async getAllByUserId(userId: string): Promise<Media[]> {

    return this.repository.getAllByUserId(userId);
  }

  async create(item: Media): Promise<Media | undefined> {

    return this.repository.create(item);
  }

  async deleteAllByUserId(userId: string): Promise<boolean> {

    return this.repository.deleteAllByUserId(userId);
  }

}