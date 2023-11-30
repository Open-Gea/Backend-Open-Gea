// src/scripts/init-db.ts

import * as fs from 'fs';
import * as path from 'path';
import { getConnection } from '../config/getConnection';
import { InitialDataSource } from '../config/init-data-source';
import PostgresDataSource from '../config/data-source';

async function initDb() {
  try {
    let connection = await getConnection(InitialDataSource);

    const dddlPath = path.join(__dirname, './../../db/ddl.sql');
    const dmlPath = path.join(__dirname, './../../db/dml.sql');

    const dddlContent = fs.readFileSync(dddlPath, 'utf-8');
    await connection.query(dddlContent);

    const dmlContent = fs.readFileSync(dmlPath, 'utf-8');
    await connection.query(dmlContent);

    await connection.destroy();

    connection = await getConnection(PostgresDataSource);

    await connection.synchronize();

    console.log('Postgres Tables Created');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(); 
  }
}

initDb();
