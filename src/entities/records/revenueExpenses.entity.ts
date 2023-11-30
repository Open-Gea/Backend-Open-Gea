import {
Column,
Entity,
JoinColumn,
ManyToOne,
PrimaryGeneratedColumn,
} from "typeorm";

import { FarmEntity } from "../farm/farm.entity";
import { UserEntity } from "../user/user.entity";
import { RevenuesExpenses } from "../../models/records/revenuesExpenses";
import { Farm } from "../../models/farm/farm";


@Entity({ name: "revenues_expenses" })
export class RevenuesExpensesEntity implements RevenuesExpenses {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({ name: "date", type: "varchar", nullable: true })
    date: string;
    
    @Column({ name: "type", type: "varchar", nullable: true })
    type: string;
    
    @Column({ name: "category", type: "varchar", nullable: true })
    category: string;
    
    @Column({ name: "amount", type: "numeric", nullable: true })
    amount: number;
    
    @Column({ name: "coin", type: "varchar", nullable: true })
    coin: string;
    
    @Column({ name: "detail", type: "varchar", nullable: true })
    detail: string;

    @Column({
        name: "created_at",
        type: "timestamp without time zone",
        nullable: false,
        default: () => "now()",
    })
    createdAt: Date;

    @ManyToOne(() => FarmEntity, (farm) => farm.id, { nullable: true })
    @JoinColumn({ name: "farm_id", referencedColumnName: "id" })
    farmId: Farm;

    @ManyToOne(() => UserEntity, (user) => user.id ,{nullable: false})
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    userId:string;

    @Column({name: 'deleted', type: 'boolean', nullable: true, default: false})
    deleted: Boolean

    

}
