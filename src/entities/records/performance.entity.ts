import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lot } from "../../models/records/lots";
import { Performance } from "../../models/records/performance";
import { LotEntity } from "./lots.entity";
import { UserEntity } from "../user/user.entity";
import { FarmEntity } from "../farm/farm.entity";

@Entity({ name: "performance" })
export class PerformanceEntity implements Performance{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "estimated_yield", type: "varchar", nullable: true })
    estimatedYield: string;

    @Column({ name: "year", type: "varchar", nullable: true })
    year: string;

    @Column({ name: "harvest_date", type: "varchar",  nullable: true })
    harvestDate: Date;
    
    @Column({ name: "cultivated_species", type: "varchar", nullable: true })
    cultivatedSpecies: string;
    
    @Column({ name: "final_yield", type: "varchar",  nullable: true })
    finalYield: string;
    
    @Column({ name: "product_destiny", type: "varchar", nullable: true })
    productDestiny: string;
    
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
    
    @Column({name: 'lots', type: 'jsonb', nullable: true })
    lot: Lot;

    @ManyToOne(() => UserEntity, (user) => user.id ,{nullable: false})
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    userId:string;

    @Column({name: 'deleted', type: 'boolean', nullable: true, default: false})
    deleted: Boolean
}