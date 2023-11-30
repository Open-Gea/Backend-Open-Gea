import { DataSource, EntityMetadata, ObjectLiteral, Repository } from "typeorm";
import { RecordRepository } from "../../repositories/record/recordRepository";

export class GenericDAO<Entity extends ObjectLiteral> implements RecordRepository<Entity> {

  private repository: Repository<Entity>;
  private entityMetadata: EntityMetadata;

  constructor(connection: DataSource, entity: { new (): Entity }) {
      this.repository = connection.getRepository(entity);
      this.entityMetadata = connection.getMetadata(entity);
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await this.repository.update( id , { deleted: true } as unknown as Entity);
    return result.affected !== undefined && result.affected > 0;
  }

  async search(query?: string | undefined): Promise<Entity[]> {
    const queryBuilder = this.repository.createQueryBuilder("alias");
    
    this.entityMetadata.relations.forEach((relation) => {
      if (relation.propertyName !== "userId")
        queryBuilder.leftJoinAndSelect(`alias.${relation.propertyName}`, relation.propertyName);
    });

    queryBuilder.where("alias.deleted = :isDeleted", { isDeleted: false });
    
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
    .where('alias.id = :id', {id})
    .getOne()

    return result || undefined;
  }

  async create(item: Entity): Promise<Entity | undefined> {
    const result = await this.repository.save(item);
    return result || undefined;
  }

  async getAllByUser(userId: string): Promise<Entity[]> {
    const queryBuilder = this.repository.createQueryBuilder("alias");

    
    this.entityMetadata.relations.forEach((relation) => {
      if (relation.propertyName !== "userId")
        queryBuilder.leftJoinAndSelect(`alias.${relation.propertyName}`, relation.propertyName);
    });


    queryBuilder.where('alias.userId = :userId', {userId})
    queryBuilder.andWhere("alias.deleted = :isDeleted", { isDeleted: false });

    const result = await queryBuilder.getMany()
    return result || [];
  }
}
