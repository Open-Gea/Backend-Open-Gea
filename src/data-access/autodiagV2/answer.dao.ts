import { GenericDAOV2 } from "../utils/generic.dao";
import { AnswerAutodiagEntityV2 } from "../../entities/autodiagV2/answer.entity";
import { AnswerAutodiagRepositoryV2 } from "../../repositories/autodiagV2/answer.repository";
import { AnswerAutodiagV2 } from "../../models/autodiagV2/answer";


export class AnswerAutoDiagDAOV2 extends GenericDAOV2<AnswerAutodiagEntityV2> implements AnswerAutodiagRepositoryV2 {
  constructor() {
    super(AnswerAutodiagEntityV2);
  }
  
  async getAllByUser(userId: string): Promise<AnswerAutodiagV2[]> {
    const queryBuilder = this.repository.createQueryBuilder("alias");

    
    this.entityMetadata.relations.forEach((relation) => {
      if (relation.propertyName !== "userId")
        queryBuilder.leftJoinAndSelect(`alias.${relation.propertyName}`, relation.propertyName);
    });

    if(userId) queryBuilder.where('alias.userId = :userId', {userId})

    const result = await queryBuilder.getMany()
    return result || [];
  }
}
