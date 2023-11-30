import { ICRUD } from "./interfaces/ICRUD";
import { ISearch } from "./interfaces/ISearch";

export interface GenericRepo<T> extends ICRUD<T> , ISearch<T>{}