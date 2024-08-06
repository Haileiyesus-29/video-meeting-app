'use server'
import 'server-only'
import { clearSession } from '@/lib/session'

export async function logout() {
   await clearSession()
   return null
}
