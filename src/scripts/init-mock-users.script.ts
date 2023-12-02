// src/scripts/init-db.ts
import * as fs from 'fs';
import * as path from 'path';
import { getConnection } from '../config/getConnection';
import { InitialDataSource } from '../config/init-data-source';
import PostgresDataSource from '../config/data-source';
import { UserEntity } from '../entities/user/user.entity';
import bcrypt from 'bcrypt';

async function initMockUser() {
  try {

    const connection = await getConnection(PostgresDataSource);

    const jsonMockUsers = fs.readFileSync(path.join(__dirname, '../../mock/users/users.json'), 'utf-8');
    const mockUsers = JSON.parse(jsonMockUsers);
    
    await connection.query('DELETE FROM users')

    await connection.transaction(async transactionalEntityManager => {
      const userRepository = transactionalEntityManager.getRepository(UserEntity);

      for (const userData of mockUsers) {
        userData.password = bcrypt.hashSync(userData.password!, 10);
        const newUser = userRepository.create(userData);
        await userRepository.save(newUser);
      }

      console.log('Mock users created');
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(); 
  }
}

initMockUser();
