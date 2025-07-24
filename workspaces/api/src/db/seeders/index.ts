import { db } from '../db';
import { userSeeder } from './user.seeder';

async function startSeeder() {
  console.log('Seeding database...')
  await userSeeder(db);
}

startSeeder();