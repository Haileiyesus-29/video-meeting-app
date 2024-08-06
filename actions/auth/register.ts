'use server'

import 'server-only'
import { db, schema } from '@/db'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const registerSchema = z
   .object({
      name: z
         .string()
         .min(3, { message: 'Name must be at least 3 characters long' }),
      email: z.string().email({ message: 'Invalid email' }),
      password: z
         .string()
         .min(8, { message: 'Password must be at least 8 characters long' })
         .regex(/[a-z]/, {
            message: 'Password must contain a lowercase letter',
         })
         .regex(/[A-Z]/, {
            message: 'Password must contain uppercase letter',
         })
         .regex(/[0-9]/, {
            message: 'Password must contain a number',
         }),
      confirmPassword: z.string(),
   })
   .refine(
      data => {
         return data && data.password === data.confirmPassword
      },
      {
         path: ['confirmPassword'],
         message: 'Passwords do not match',
      }
   )

export async function register<T, U extends FormData>(_: T, formData: U) {
   const validateFields = registerSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email')?.toString().toLocaleLowerCase(),
      password: formData.get('password'),
      confirmPassword: formData.get('cpassword'),
   })

   if (!validateFields.success) {
      return {
         message: 'Register failed',
         errors: validateFields.error.flatten().fieldErrors,
      }
   }

   const existingUser = await db.query.users.findFirst({
      where: eq(schema.users.email, validateFields.data.email),
   })

   if (existingUser)
      return {
         message: 'Email address already in use',
         errors: {
            email: ['Email address already in use'],
         },
      }

   const user = await db
      .insert(schema.users)
      .values({
         name: validateFields.data.name,
         email: validateFields.data.email,
         password: validateFields.data.password,
      })
      .returning()

   return redirect('/')
}
