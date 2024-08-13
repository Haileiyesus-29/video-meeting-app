'use server'
import 'server-only'
import { z } from 'zod'
import { createSchedule } from '@/db'
import { verifySession } from '@/lib/session'
import { redirect } from 'next/navigation'

const schema = z
   .object({
      title: z
         .string()
         .min(3, { message: 'title must be atleast 3 characters long' }),
      description: z.string(),
      start_time: z
         .string()
         .transform(value => new Date(value))
         .refine(date => date instanceof Date && date > new Date(), {
            message: 'date must be in the future',
         }),
      end_time: z.string().transform(value => new Date(value)),
      invitees: z
         .array(z.string().uuid({ message: 'Invalid invitee' }))
         .nonempty({ message: 'Atleast one invitee is required' }),
   })
   .refine(data => data.start_time < data.end_time, {
      path: ['end_time'],
      message: 'End time must be after start time',
   })
   .transform(data => ({
      ...data,
      start_time: new Date(data.start_time),
      end_time: new Date(data.end_time),
   }))

export async function createScheduleAction<T, U extends FormData>(
   _: T,
   formData: U
) {
   try {
      const validateFields = schema.safeParse({
         title: formData.get('title'),
         description: formData.get('description'),
         start_time: formData.get('start_time'),
         end_time: formData.get('end_time'),
         invitees: JSON.parse(formData.get('invitees') as string),
      })

      if (!validateFields.success)
         return {
            message: 'Invalid credentials',
            errors: validateFields.error.flatten().fieldErrors,
         }

      const user = await verifySession()

      await createSchedule({
         user_id: user.id,
         title: validateFields.data.title,
         description: validateFields.data.description,
         start_time: validateFields.data.start_time,
         end_time: validateFields.data.end_time,
         invitees: validateFields.data.invitees as string[],
      })
   } catch (error) {
      console.log(error)
      return {
         message: 'Failed to create group',
         errors: { form: ['Failed to create the group'] },
      }
   }

   return redirect('/meetings')
}
