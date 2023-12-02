import { DataSource, EntityMetadata, ObjectLiteral, Repository } from "typeorm";
import { GenericRepo } from "../../repositories/utils/generic.repo";
import { getConnection } from "../../config/getConnection";
import PostgresDataSource from "../../config/data-source";

export class GenericDAOV2<Entity extends ObjectLiteral> implements GenericRepo<Entity> {

  protected repository: Repository<Entity>;
  protected entityMetadata: EntityMetadata;

  constructor(entity: { new (): Entity }) {
    getConnection(PostgresDataSource).then((connection) => {
      this.repository = connection.getRepository(entity);
      this.entityMetadata = connection.getMetadata(entity);
    });
  }

  async search(query?: string | undefined): Promise<Entity[]> {
    const queryBuilder = this.repository.createQueryBuilder("alias");
    
    this.entityMetadata.relations.forEach((relation) => {
      if (relation.propertyName !== "userId")
        queryBuilder.leftJoinAndSelect(`alias.${relation.propertyName}`, relation.propertyName);
    });

    
    const result = await queryBuilder.getMany();
    return result || [];
  
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async update(id: string, item: Entity): Promise<boolean> {
    const result = await this.repository.update( id , item);
    return result.affected !== undefined && result.affected > 0;
  }

  async read(id: string): Promise<Entity | undefined> {
    const result = 
    await this.repository.createQueryBuilder('alias')
    .loadAllRelationIds()
    .where('alias.id = :id', {id})
    .getOne()

    return result || undefined;
  }

  async create(item: Entity): Promise<Entity | undefined> {
    const result = await this.repository.save(item);
    return result || undefined;
  }

}
