import { Media } from '../../models/utils/media';
import { ICRUD } from './interfaces/ICRUD';

export interface MediaRepository extends ICRUD<Media> {

  getAllByUserId(userId: string): Promise<Media[]>;

  deleteAllByUserId(id: string): Promise<boolean>;
}