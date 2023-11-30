import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { FarmEntity } from "../farm/farm.entity";
import { Agricultural, Livestock, ProdInfo } from "../../models/records/prodInfo";


@Entity('prod_info')
export class ProdInfoEntity implements ProdInfo{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({name: 'date_prod_info', type: "varchar", nullable: true})
    dateProdInfo: Date;
    
    @Column({ name: "agricultural", type: "jsonb", nullable: true })
    agricultural: Agricultural[];
    
    @Column({name: 'agricultural_hectares', type: 'numeric', nullable: true})
    agriculturalHectares: number;
    
    @Column({ name: "livestock", type: "jsonb", nullable: true })
    livestock: Livestock[];
    
    @Column({name: 'livestock_hectares', type: 'numeric', nullable: true})
    livestockHectares: number;
    
    @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    userId: string;
    
    @ManyToOne(() => FarmEntity, (farm) => farm.id, { nullable: true })
    @JoinColumn({ name: 'farm_id', referencedColumnName: 'id' })
    farmId: string;
    
    @Column({name: 'created_at',type:"timestamp without time zone" ,nullable: false, default: () => 'now()'})
    createdAt: Date;

    @Column({name: 'deleted', type: 'boolean', nullable: true, default: false})
    deleted: Boolean
}

