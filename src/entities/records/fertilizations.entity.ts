import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {  Fertilization } from "../../models/records/fertilization";
import { Lot } from "../../models/records/lots";
import { UserEntity } from "../user/user.entity";
import { FarmEntity } from "../farm/farm.entity";

@Entity({name: 'fertilizations_record'})
export class FertilizerEntity implements Fertilization{
  
  
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({name: 'type', type: 'varchar', nullable: true})
  type: string;
  
  @Column({name: 'lots', type: 'jsonb', nullable: true })
  lots: Lot[];
  
  @Column( {name: "date_of_use", type: "varchar", nullable: true})
  dateOfUse: Date;
  
  @Column({name: 'organic_type', type: 'varchar', nullable: true})
  organicType: string;
  
  @Column({name: 'elaboration_type', type: 'varchar', nullable: true})
  elaborationType: string;
  
  @Column({name: 'dose_plant', type: 'numeric', unsigned: true,  nullable: true})
  dosePlant: number;
  
  @Column({name: 'dose_plant_unit', type: 'varchar',  nullable: true})
  dosePlantUnit: string;
  
  @Column({name: 'dose_area', type: 'numeric', unsigned: true,  nullable: true})
  doseArea: number;
  
  @Column({name: 'dose_area_unit', type: 'varchar',  nullable: true})
  doseAreaUnit: string;

  @Column({name: 'responsible_name', type: 'varchar',  nullable: true})
  responsibleName: string;

  @Column({name: 'crop', type: 'varchar',  nullable: true})
  crop: string;

  @Column({name: 'name', type: 'varchar', nullable: true})
  name: string;
  
  @Column({name: 'brand', type: 'varchar',  nullable: true})
  brand: string;

  @Column({name: 'recipe', type: 'boolean',  nullable: true})
  recipe: boolean;

  @Column({name: 'machinery_used', type: 'varchar',  nullable: true})
  machineryUsed: string;

  @ManyToOne(() => UserEntity, (user) => user.id ,{nullable: false})
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  userId:string;

  @Column({
    name: "created_at",
    type: "timestamp without time zone",
    nullable: false,
    default: () => "now()",
  })
  createdAt: Date;

  @ManyToOne(() => FarmEntity, (farm) => farm.id, { nullable: true })
  @JoinColumn({ name: 'farm_id', referencedColumnName: 'id' })
  farmId: string;

  @Column({name: 'deleted', type: 'boolean', nullable: true, default: false})
  deleted: Boolean
}