import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sowing } from "../../models/records/sowing";
import { LotEntity } from "./lots.entity";
import { UserEntity } from "../user/user.entity";
import { FarmEntity } from "../farm/farm.entity";
import { Lot } from "../../models/records/lots";

@Entity({name: 'sowing'})
export class SowingEntity implements Sowing{
    
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'species', type: 'varchar', length: 128, nullable: true})
    species: string;

    @Column({name: 'date_of_sowing', type: "varchar", nullable: true})
    dateOfSowing: Date;

    @Column({name: 'seeds_in_kg', type: 'numeric', unsigned:true, nullable: true})
    seedsInKg: number;

    @Column({name: 'sowing_density', type: 'numeric', unsigned:true, nullable: true})
    sowingDensity: number;

    @Column({name: 'sowing_origin', type: 'varchar', length: 128, nullable: true})
    sowingOrigin: string;

    @Column({name: 'predecessor_crop', type: 'varchar', length: 128, nullable: true})
    predecessorCrop: string;

    @Column({name: 'variety_sown', type: 'varchar', length: 128, nullable: true})
    varietySown: string;

    @ManyToOne(() => FarmEntity, (farm) => farm.id, { nullable: true })
    @JoinColumn({ name: 'farm_id', referencedColumnName: 'id' })
    farmId: string;

    @Column({name: 'lots', type: 'jsonb', nullable: true })
    lot: Lot;

    @Column({name: "created_at", type: "timestamp without time zone", nullable: false, default: () => "now()"})
    createdAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.id ,{nullable: false})
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    userId:string;

    @Column({name: 'deleted', type: 'boolean', nullable: true, default: false})
    deleted: Boolean
    
}