import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Lot } from "../../models/records/lots";
import { FarmEntity } from "../farm/farm.entity";
import { UserEntity } from "../user/user.entity";


@Entity({ name: "lots" })
export class LotEntity implements Lot {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "lotname", type: "varchar", length: 128, nullable: false })
  name: string;

  @Column({ name: "surface", type: "varchar", length: 32, nullable: false })
  surface: string;

  @Column({
    name: "ubication",
    type: "jsonb",
    nullable: false,
    default: { lat: 0, lng: 0 },
  })
  ubication: object;

  @Column({
    name: "characteristics",
    type: "varchar",
    length: 256,
    nullable: true,
  })
  characteristics: string;

  @Column({ name: "notes", type: "varchar", length: 128, nullable: true })
  notes: string;

  @Column({
    name: "created_at",
    type: "timestamp without time zone",
    nullable: false,
    default: () => "now()",
  })
  createdAt: Date;

  @ManyToOne(() => FarmEntity, (farm) => farm.id, { nullable: false })
  @JoinColumn({ name: "farm_id", referencedColumnName: "id" })
  farmId: string;

  @ManyToOne(() => UserEntity, (user) => user.id ,{nullable: false})
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  userId:string;

  @Column({name: 'deleted', type: 'boolean', nullable: true, default: false})
    deleted: Boolean

}
