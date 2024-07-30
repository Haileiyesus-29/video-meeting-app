import { db, schema } from '@/db'

export async function getUsers() {
   const users = await db.select().from(schema.users)
   return users
}
