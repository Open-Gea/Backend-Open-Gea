import { ICRUD } from "../utils/interfaces/ICRUD";
import { ISearch } from "../utils/interfaces/ISearch";

export interface RecordRepository<T> extends ICRUD<T> , ISearch<T>{
    getAllByUser(userId: string): Promise<T[]>;
    softDelete(id: string): Promise<boolean>;
}