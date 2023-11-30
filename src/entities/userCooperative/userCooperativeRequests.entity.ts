import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Cooperatives } from "../../models/userCooperative/cooperatives";
import { User } from "../../models/user/user";
import { UserEntity } from "../user/user.entity";
import { CooperativesEntity } from "./cooperativesEntity";
import { UserCooperativeRequests, ORIGIN, STATUS } from "../../models/userCooperative/userCooperativeRequests";

@Entity('user_cooperative_requests')
export class UserCooperativeRequestsEntity implements UserCooperativeRequests  {


  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => CooperativesEntity, (coop) => coop.id, { nullable: false })
  @JoinColumn({ name: "coop", referencedColumnName: "id" })
  coop: Cooperatives;

  @Column({ name: 'messageBody', type: 'varchar', length: 500, nullable: false })
  messageBody: string;

  @Column({ name: 'status', type: 'varchar', nullable: false , default:STATUS.PENDING})
  status: STATUS;

  @Column({ name: 'origin', type: 'varchar', nullable: false})
  origin: ORIGIN;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false, default: () => 'now()' })
  createdAt: Date;


}