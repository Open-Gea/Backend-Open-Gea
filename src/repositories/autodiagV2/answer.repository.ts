import { AnswerAutodiagV2 } from "../../models/autodiagV2/answer";
import { ICRUD } from "../utils/interfaces/ICRUD";
import { ISearch } from "../utils/interfaces/ISearch";
import { GenericRepo } from "../utils/generic.repo";


export interface AnswerAutodiagRepositoryV2 extends GenericRepo<AnswerAutodiagV2> {
     getAllByUser(userId: string) : Promise<AnswerAutodiagV2[]>
}