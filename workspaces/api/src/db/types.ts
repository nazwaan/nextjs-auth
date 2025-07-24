import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import * as schema from "./schema-compiled"

const user = schema.user

export type SelectUser = InferSelectModel<typeof user>
export type InsertUser = InferInsertModel<typeof user>
export type DbSchema = typeof schema