import { db } from '../db';
import { users } from '../schema/user';
import { userSeeds } from './user.seeder';

async function startSeeder() {
  await db.insert(users).values(userSeeds);
}

startSeeder();