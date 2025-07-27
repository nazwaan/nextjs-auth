require('dotenv').config();

export default {
  schema: './src/db/schema/*',
  out: './src/db/migrations',
  dialect: 'postgresql',
  url: process.env.DATABASE_URL,
} as const;