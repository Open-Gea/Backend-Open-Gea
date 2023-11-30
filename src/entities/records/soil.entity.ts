import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Soil} from "../../models/records/soil";
import { Lot } from "../../models/records/lots";
import { LotEntity } from "./lots.entity";
import { UserEntity } from "../user/user.entity";
import { FarmEntity } from "../farm/farm.entity";
import { urls } from "../../models/farm/farm";

@Entity('soil_data')
export class SoilEntity implements Soil{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column({name: 'year', type: "varchar", nullable: false})
    year: string;
    
    @Column({name: 'usage', type: 'varchar', nullable: false})
    usage: string;

    @ManyToOne(() => FarmEntity, (farm) => farm.id, { nullable: true })
    @JoinColumn({ name: 'farm_id', referencedColumnName: 'id' })
    farmId: string;

    @Column({name: 'lots', type: 'jsonb', nullable: true })
    lot: Lot;
    
    @Column({name: 'notes', type: 'varchar', length: 256, nullable: true})
    notes: string;

    @Column({ name: "urls", type: "jsonb", nullable: true })
    urls: urls[] | null;
    
    @ManyToOne(() => UserEntity, (user) => user.id ,{nullable: false})
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    userId:string;

    @Column({name: 'created_at', type: 'timestamp without time zone', default: () => "now()"})
    createdAt: Date;

    @Column({name: 'deleted', type: 'boolean', nullable: true, default: false})
    deleted: Boolean
    
}