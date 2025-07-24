import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema-compiled';

const pool = new Pool({
  connectionString: 'postgres://nextjs-auth:nextjs-auth@nextjs-auth-db:5432/nextjs-auth',
})

export const db = drizzle(pool, { schema })