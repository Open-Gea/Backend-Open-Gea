import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sale } from "../../models/records/sales";
import { UserEntity } from "../user/user.entity";
import { FarmEntity } from "../farm/farm.entity";

@Entity('sales')
export class SaleEntity implements Sale{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({name:'sale_date', type:'varchar', nullable: false})
    saleDate: Date;
    
    @Column({name:'revenue', type:'numeric', nullable: false})
    revenue: number;
    
    @Column({name:'coin', type:'varchar', nullable: false})
    coin: string;
    
    @Column({name:'product_sold', type:'varchar', nullable: false})
    productSold: string;
    
    @Column({name:'weight_sold', type:'varchar', nullable: false})
    weightSold: string;
    
    @Column({name:'unit_sold', type:'varchar', nullable: true})
    unitSold: string;
    
    @Column({name:'buyer_name', type:'varchar', nullable: false})
    buyerName: string;
    
    @Column({name:'buyer_country', type:'varchar', nullable: false})
    buyerCountry: string;
    
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