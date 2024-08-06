'use server'
import 'server-only'
import { db, schema } from '@/db'
import { and, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { setSession } from '@/lib/session'

const loginSchema = z.object({
   email: z.string().email(),
   password: z.string(),
})

export async function login<T, U extends FormData>(_: T, formData: U) {
   const validateFields = loginSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
   })
   if (!validateFields.success) {
      return {
         message: 'Login failed',
         errors: 'Invalid credentials',
      }
   }

   const user = await db.query.users.findFirst({
      where: eq(schema.users.email, validateFields.data.email),
   })
   if (!user || user.password !== validateFields.data.password)
      return {
         message: 'Login not successfull',
         errors: 'Invalid email or password',
      }

   await setSession(user.id)
   return redirect('/')
}
