import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Labor } from "../../models/records/labors";
import { Lot } from "../../models/records/lots";
import { LotEntity } from "./lots.entity";
import { UserEntity } from "../user/user.entity";
import { FarmEntity } from "../farm/farm.entity";

@Entity('labors')
export class LaborEntity implements Labor{
    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column({name: 'date_of_labor', type: "varchar", nullable: true})
    dateOfLabor: Date;
    
    @Column({name: 'crop', type: 'varchar', length:64, nullable: true})
    crop: string;
    
    @Column({name: 'labor', type: 'varchar', length:128, nullable:true})
    labor: string;
    
    @Column({name:'responsible_name', type: 'varchar', length: 64, nullable:true})
    responsibleName: string;
    
    @Column({name: 'lot', type: 'jsonb', nullable: true })
    lot: Lot;

    @ManyToOne(() => FarmEntity, (farm) => farm.id, { nullable: true })
    @JoinColumn({ name: 'farm_id', referencedColumnName: 'id' })
    farmId: string;
    
    @Column({name: 'notes', type: 'varchar', length: 256, nullable: true})
    notes: string;
    
    @ManyToOne(() => UserEntity, (user) => user.id ,{nullable: false})
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    userId:string;

    @Column({name: 'created_at', type: 'timestamp without time zone', default: () => "now()"})
    createdAt: Date;
    
    @Column({name: 'deleted', type: 'boolean', nullable: true, default: false})
    deleted: Boolean
}