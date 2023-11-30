import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Phyto } from "../../models/records/phyto";
import { LotEntity } from "./lots.entity";
import { UserEntity } from "../user/user.entity";
import { FarmEntity } from "../farm/farm.entity";
import { Lot } from "../../models/records/lots";

@Entity('phyto')
export class PhytoEntity implements Phyto{
    
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({ name: "type", type: "varchar", nullable: true })
    type: string;

    @Column({ name: "product_name", type: "varchar", nullable: true })
    productName: string;

    @Column({ name: "brand", type: "varchar", nullable: true })
    brand: string;

    @Column({ name: "active_substance", type: "varchar", nullable: true })
    activeSubstance: string;

    @Column({ name: "class", type: "varchar", nullable: true })
    phytoClass: string;

    @Column({ name: "toxicologic_type", type: "varchar", nullable: true })
    toxicologicType: string;

    @Column({ name: "app_date", type: "varchar", nullable: true })
    appDate: string;

    @Column({ name: "crop", type: "varchar", nullable: true })
    crop: string;

    @Column({ name: "crop_variety", type: "varchar", nullable: true })
    cropVariety: string;

    @Column({ name: "pest_to_combat", type: "varchar", nullable: true })
    pestToCombat: string;

    @Column({ name: "dose", type: "numeric", nullable: true })
    dose: number;

    @Column({ name: "dose_unit", type: "varchar", nullable: true })
    doseUnit: string;


    @Column({ name: "machinery_used", type: "varchar", nullable: true })
    machineryUsed: string;

    @Column({ name: "safety_return_date", type: "varchar", nullable: true })
    safetyReturnDate: string;

    @Column({ name: "grace_period", type: "varchar", nullable: true })
    gracePeriod: string;

    @Column({ name: "person_in_charge", type: "varchar", nullable: true })
    responsibleName: string;

    @Column({ name: "elaboration_type", type: "varchar", nullable: true })
    elaborationType: string;

    @Column({ name: "recipe", type: "boolean", nullable: true })
    recipe: boolean;

    @Column({
        name: "created_at",
        type: "timestamp without time zone",
        nullable: false,
        default: () => "now()",
      })
    createdAt: Date;

    @Column({name: 'lots', type: 'jsonb', nullable: true })
    lots: Lot[];

    @ManyToOne(() => FarmEntity, (farm) => farm.id, { nullable: true })
    @JoinColumn({ name: 'farm_id', referencedColumnName: 'id' })
    farmId: string;
    
    @ManyToOne(() => UserEntity, (user) => user.id ,{nullable: false})
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    userId:string;

    @Column({name: 'deleted', type: 'boolean', nullable: true, default: false})
    deleted: Boolean

}