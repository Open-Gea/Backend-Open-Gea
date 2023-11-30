import {

  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Farm, urls } from "../../models/farm/farm";
import { UserEntity } from "../user/user.entity";
import { LotEntity } from "../records/lots.entity";
import { Lot } from "../../models/records/lots";
import { Hidric } from "../../models/records/generalInfo";


import { SettingQrEntity } from '../qr/settingQr.entity';

@Entity({ name: "farms" })
export class FarmEntity implements Farm {
  
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "farmname", type: "varchar", length: 128, nullable: false })
  name: string;

  @Column({ name: "farmowner", type: "varchar", length: 128, nullable: false })
  owner: string;

  @Column({ name: "telephone", type: "varchar", length: 32, nullable: false })
  telephone: string;

  @Column({ name: "country", type: "varchar", length: 32, nullable: false })
  country: string;

  @Column({name: "ubication",type: "jsonb",nullable: false,default: { lat: 0, lng: 0 },})
  ubication: object;

  @Column({ name: "start", type: "varchar", length: 32, nullable: true })
  start: string;

  @Column({name: "totalsurface",type: "varchar",length: 32,nullable: false,})
  totalSurface: string;

  @Column({name: "infrastructure",type: "varchar",length: 128,nullable: true,})
  infrastructure: string;

  @Column({name: "perimetralfence",type: "varchar",length: 32,nullable: true,})
  perimetralFence: string;

  @Column({ name: "hidricRes", type: "enum", array:true, enum: Hidric, nullable: true })
  hidricRes: Hidric;

  @Column({name: "created_at",type: "timestamp",nullable: false,default: () => "now()",})
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
  @JoinColumn({ name: "userid", referencedColumnName: "id" })
  userId: string;

  @OneToMany(() => LotEntity, (lot) => lot.farmId, { nullable: false })
  @JoinColumn({ name: "lots", referencedColumnName: "id" })
  lots: Lot[];

  @Column({ name: "urls", type: "jsonb", nullable: true })
  urls: urls[] | null;


  @OneToMany(() => SettingQrEntity, (settingQr) => settingQr.farm_id)
  settingsQr: SettingQrEntity[];


}
