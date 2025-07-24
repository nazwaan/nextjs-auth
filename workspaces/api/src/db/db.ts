import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as users from './schema/user';

const pool = new Pool({
  connectionString: 'postgres://nextjs-auth:nextjs-auth@nextjs-auth-db:5432/nextjs-auth',
})

const schema = {
  ...users
}

export const db = drizzle(pool, { schema })