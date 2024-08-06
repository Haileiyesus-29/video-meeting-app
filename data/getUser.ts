'use server'
import 'server-only'
import { db, schema } from '@/db'
import { verifySession } from '@/lib/session'
import { eq } from 'drizzle-orm'
import { cache } from 'react'

export const getUserById = cache(async (id: string) => {
   const user = await db.query.users.findFirst({
      where: eq(schema.users.id, id),
   })
   return user
})

export const getUser = async () => {
   const user = await verifySession()
   return user
}
