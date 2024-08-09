'use server'
import 'server-only'
import { createUser, getUserByEmail } from '@/db'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { setSession } from '@/lib/session'

const registerSchema = z
   .object({
      name: z
         .string()
         .min(2, { message: 'Name must be at least 2 characters long' }),
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

   if (await getUserByEmail(validateFields.data.email))
      return {
         message: 'Email address already in use',
         errors: {
            email: ['Email address already in use'],
         },
      }

   try {
      let user = await createUser({
         name: validateFields.data.name,
         email: validateFields.data.email,
         password: validateFields.data.password,
      })
      await setSession(user[0].id)
   } catch (error) {
      console.log(error)
      return {
         message: 'Register failed',
         errors: {
            form: ['An error occurred. Please try again later'],
         },
      }
   }

   return redirect('/')
}
