import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BioInputs, ProcessRegister } from "../../models/records/bioinputs";
import { UserEntity } from "../user/user.entity";
import { FarmEntity } from "../farm/farm.entity";

@Entity({name: 'bioinputs'})
export class BioinputsEntity implements BioInputs{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({name: 'name', type: 'varchar',  nullable: true})
    name: string;
    
    @Column({name: 'type', type: 'varchar',  nullable: true})
    type: string;
    
    @Column({name: 'liquidSolid', type: 'varchar',  nullable: true})
    liquidSolid: string;
    
    @Column({name: 'elaboration_date', type: "varchar",  nullable: true})
    elaborationDate: Date;
    
    @Column({name: 'expiration_date', type: "varchar",  nullable: true})
    expirationDate: Date;
    
    @Column({name: 'material_quantity', type: 'jsonb', nullable: true})
    materialAndQuantity: object[];
    
    @Column({name: 'quantity_produced', type: 'numeric', unsigned: true, nullable: true})
    quantityProduced: number;
    
    @Column({name: 'unit_produced', type: 'varchar',  nullable: true})
    unitProduced: string;
    
    @Column({name: 'production_cost', type: 'numeric', unsigned: true, nullable: true})
    productionCost: number;
    
    @Column({name: 'unit_', type: 'varchar',  nullable: true})
    unitCost: string;
    
    @Column({name: 'responsible_name', type: 'varchar',  nullable: true})
    responsibleName: string

    @Column({name: 'process_register', type: 'json', nullable: true})
    processRegister: ProcessRegister;

    @Column({name: "created_at", type: "timestamp without time zone", nullable: false, default: () => "now()"})
    createdAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.id ,{nullable: false})
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    userId:string;

    @ManyToOne(() => FarmEntity, (farm) => farm.id, { nullable: true })
    @JoinColumn({ name: 'farm_id', referencedColumnName: 'id' })
    farmId: string;
    

    @Column({name: 'deleted', type: 'boolean', nullable: true, default: false})
    deleted: Boolean
    
}