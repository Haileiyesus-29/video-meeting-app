'use server'
import 'server-only'
import { verifySession } from '@/lib/session'

export async function verify() {
   await verifySession()

   return null
}
