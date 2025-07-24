import { sql } from 'drizzle-orm'
import { db } from './db'

async function resetSchema() {
  console.log('Cleaning database...')
  await db.execute(sql`DROP SCHEMA IF EXISTS public CASCADE;`);
  await db.execute(sql`CREATE SCHEMA public;`);
}

resetSchema()