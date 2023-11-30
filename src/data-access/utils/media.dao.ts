import { DataSource, Connection, getRepository } from 'typeorm';

import { MediaEntity } from '../../entities/utils/media.entity';
import { Media } from '../../models/utils/media';
import { MediaRepository } from '../../repositories/utils/media.repository';

export class MediaDAO implements MediaRepository {
    private connection: DataSource;

    constructor(c : DataSource) {
        this.connection = c;
      }

    async create(item: Media): Promise<Media | undefined> {

        const result = await this.connection
          .createQueryBuilder()
          .insert()
          .into(MediaEntity)
          .values(item)
          .returning('*')
          .execute();

        return result.generatedMaps.length > 0 ? (result.generatedMaps[0] as Media) : undefined;
      }


    read(id: string): Promise<Media | undefined> {
        throw new Error('Method not implemented.');
    }
    update(id: string, item: Media): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async getAllByUserId(userId: string): Promise<Media[]> {
        const result = await this.connection
            .createQueryBuilder()
            .select('media')
            .from(MediaEntity, 'media')
            .where('media.user_id = :userId', { userId })
            .getMany();

        return result as unknown as Media[];
    }

    async deleteAllByUserId(user_id: string): Promise<boolean> {
        const result = await this.connection
          .createQueryBuilder()
          .delete()
          .from(MediaEntity)
          .where('user_id = :id', { id: user_id })
          .execute();

        return result.affected ? result.affected > 0 : false;
      }

}