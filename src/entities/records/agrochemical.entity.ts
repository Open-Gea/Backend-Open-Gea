import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agrochemical } from "../../models/records/agrochemical";
import { UserEntity } from "../user/user.entity";
import { FarmEntity } from "../farm/farm.entity";

@Entity('agrochemical')
export class AgrochemicalEntity implements Agrochemical{
    
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name:'purchaseDate', type:'varchar', nullable: false})
    purchaseDate: string;

    @Column({name:'brand', type:'varchar', nullable: false})
    brand: string;

    @Column({name:'volume', type:'numeric', nullable: false})
    volume: number;

    @Column({name:'unit', type:'varchar', nullable: false})
    unit: string;

    @Column({name:'active_ingredient', type:'varchar', nullable: true})
    activeIngredient: string;

    @Column({name:'expiration_date', type:'varchar', nullable: false})
    expirationDate: string;

    @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    userId: string;
    
    @Column({name: 'created_at',type: 'timestamp without time zone',nullable: false, default: () => 'now()'})
    createdAt: Date;

    @Column({name: 'deleted', type: 'boolean', nullable: true, default: false})
    deleted: Boolean

    @ManyToOne(() => FarmEntity, (farm) => farm.id, { nullable: true })
    @JoinColumn({ name: 'farm_id', referencedColumnName: 'id' })
    farmId: string;
    

}