import { db } from '../db';
import { users } from '../schema/user';
import { userSeeds } from './user.seeder';

async function startSeeder() {
  console.log('Seeding database...')
  await db.insert(users).values(userSeeds);
}

startSeeder();