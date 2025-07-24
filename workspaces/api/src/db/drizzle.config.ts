export default {
  schema: './src/db/schema/*',
  out: './src/db/migrations',
  dialect: 'postgresql',
  url: 'postgres://nextjs-auth:nextjs-auth@nextjs-auth-db:5432/nextjs-auth',
} as const;