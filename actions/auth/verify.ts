'use server'
import 'server-only'

import { db, schema } from '@/db'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { verifySession } from '@/lib/session'

export async function verify() {
   await verifySession()

   return null
}
