import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const isLocal = process.env.NODE_ENV === 'local'

const PostgresDataSource = new DataSource({
  type: "postgres",
  synchronize: false,
  logging: true,
  host: !isLocal ? process.env.PG_HOST : process.env.PG_HOST_LOCAL,
  port: !isLocal ? Number(process.env.PG_PORT) : Number(process.env.PG_PORT_LOCAL),
  username: !isLocal ? process.env.PG_USER : process.env.PG_USER_LOCAL,
  password: !isLocal ? process.env.PG_PASSWORD : process.env.PG_PASSWORD_LOCAL ,
  database: !isLocal ? process.env.PG_DATABASE : process.env.PG_DATABASE_LOCAL,
  ssl: !isLocal ? true : false,
  extra: !isLocal ? { ssl: { ca: process.env.PG_CA } } : undefined,
  entities: ["src/entities/**/*.ts"],
  migrations:["db/migrations/**/*.ts"]
});


export default PostgresDataSource;