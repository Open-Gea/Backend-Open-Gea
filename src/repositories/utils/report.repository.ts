import { Report } from '../../models/utils/report';
import { ICRUD } from './interfaces/ICRUD';
import { ISearch } from './interfaces/ISearch';

export interface ReportRepository extends ICRUD<Report>, ISearch<Report> {
  getAll(): Promise<Report[]>;
}
