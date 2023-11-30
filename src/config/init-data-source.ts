import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { UserRoleEntity } from '../entities/user/userRole.entity';
import { UserStatusEntity } from '../entities/user/userStatus.entity';

dotenv.config();

const isLocal = process.env.NODE_ENV === 'local'

export const InitialDataSource = new DataSource({ //Just to get start with the init-db script!!
    type: "postgres",
    synchronize: true,
    logging: true,
    host: !isLocal ? process.env.PG_HOST : process.env.PG_HOST_LOCAL,
    port: !isLocal ? Number(process.env.PG_PORT) : Number(process.env.PG_PORT_LOCAL),
    username: !isLocal ? process.env.PG_USER : process.env.PG_USER_LOCAL,
    password: !isLocal ? process.env.PG_PASSWORD : process.env.PG_PASSWORD_LOCAL ,
    database: !isLocal ? process.env.PG_DATABASE : process.env.PG_DATABASE_LOCAL,
    ssl: !isLocal ? true : false,
    extra: !isLocal ? { ssl: { ca: process.env.PG_CA } } : undefined,
    entities: [UserRoleEntity, UserStatusEntity],
  });
  