import { UserEntity } from '../../entities/user/user.entity';
import { BaseObject } from './common';

export interface Report extends BaseObject {
  reporter: UserEntity;
  screenshot: string
  date: Date
  status: ReportStatus
}

export type ReportStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
