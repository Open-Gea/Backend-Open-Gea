import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Supplier } from "../../models/records/suppliers";
import { UserEntity } from "../user/user.entity";
import { FarmEntity } from "../farm/farm.entity";

@Entity('suppliers')
export class SupplierEntity implements Supplier{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({name:'name', type:'varchar', nullable: false})
    name: string;

    @Column({name:'phone', type:'varchar', nullable: false})
    phone: string;

    @Column({name:'email', type:'varchar', nullable: false})
    email: string;

    @Column({name:'service', type:'varchar', nullable: false})
    service: string;

    @Column({name:'state', type:'varchar', nullable: false})
    state: string;

    @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    userId: string;
    
    @Column({name: 'created_at',type: 'timestamp without time zone',nullable: false, default: () => 'now()'})
    createdAt: Date;

    @Column({name: 'deleted', type: 'boolean', nullable: true, default: false})
    deleted: Boolean;

    @ManyToOne(() => FarmEntity, (farm) => farm.id, { nullable: true })
    @JoinColumn({ name: 'farm_id', referencedColumnName: 'id' })
    farmId: string;
}