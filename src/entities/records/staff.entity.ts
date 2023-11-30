import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Staff } from "../../models/records/staff";
import { UserEntity } from "../user/user.entity";
import { urls } from "../../models/farm/farm";
import { FarmEntity } from "../farm/farm.entity";

@Entity('staff')
export class StaffEntity implements Staff{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'first_name', type: 'varchar', nullable: false })
    firstName: string;

    @Column({ name: 'last_name', type: 'varchar', nullable: false })
    lastName: string;
    
    @Column({ name: 'area', type: 'varchar', nullable: false })
    area: string;

    @Column({ name: 'contract_type', type: 'varchar', nullable: false })
    contractType: string;

    @Column({ name: "urls", type: "jsonb", nullable: true })
    urls: urls[] | null;
    
    @Column({
        name: 'created_at',
        type: 'timestamp without time zone',
        nullable: false,
        default: () => 'now()',
      })
    createdAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    userId: string;

    @Column({name: 'deleted', type: 'boolean', nullable: true, default: false})
    deleted: Boolean;

    @ManyToOne(() => FarmEntity, (farm) => farm.id, { nullable: true })
    @JoinColumn({ name: 'farm_id', referencedColumnName: 'id' })
    farmId: string;
}