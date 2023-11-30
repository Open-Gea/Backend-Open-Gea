import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cooperatives } from "../../models/userCooperative/cooperatives";
import { User } from "../../models/user/user";
import { UserCooperative } from "../../models/userCooperative/userCooperative";
import { UserEntity } from "../user/user.entity";
import { CooperativesEntity } from "./cooperativesEntity";

@Entity('users_cooperatives')
export class UserCooperativeEntity implements UserCooperative{
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @ManyToOne(() => UserEntity, (user) => user.id, {nullable: false})
    @JoinColumn({ name: "user_id", referencedColumnName: "id" })
        user: User;

    @ManyToOne(() => CooperativesEntity, (coop) => coop.id, {nullable: false})
    @JoinColumn({ name: "coop_id", referencedColumnName: "id" })
        cooperative: Cooperatives;
    
    @Column({ name: 'created_at', type: 'timestamp', nullable: false, default: () => 'now()' })
        createdAt: Date;
    
}