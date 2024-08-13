'use client'
import { createScheduleAction } from '@/actions/group/create-schedule'
import InviteesForm from '@/components/shared/InviteesForm'
import SubmitButton from '@/components/shared/SubmitButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from 'react-dom'

const initialFormState = {
   message: null,
   errors: null,
}

type Errors = {
   message: string | null
   errors: {
      title?: string[]
      description?: string[]
      start_time?: string[]
      end_time?: string[]
      invitees?: string[]
      form?: string[]
   } | null
}

function CreateSchedule() {
   const [state, action, isPending] = useFormState<Errors, FormData>(
      createScheduleAction,
      initialFormState
   )

   return (
      <main className='flex justify-center items-center h-full'>
         <form
            action={action}
            className='flex flex-col gap-6 p-6 border rounded-2xl w-full max-w-screen-md'
         >
            <div className='flex justify-center py-6'>
               <h2 className='font-semibold text-xl'>Schedule a new meeting</h2>
            </div>
            <div className='flex justify-center'>
               {state.errors?.form && (
                  <span className='text-red-600 text-sm'>
                     {state.errors?.form[0]}
                  </span>
               )}
            </div>
            <div className='items-center gap-x-4 gap-y-1 grid grid-cols-4'>
               <Label htmlFor='title' className='text-right'>
                  Title
               </Label>
               <Input
                  id='title'
                  name='title'
                  required
                  className='col-span-3'
                  placeholder='Title of the meeting'
               />
               {state.errors?.title && (
                  <span className='col-start-2 col-end-5 text-red-500 text-sm'>
                     {state.errors.title.at(0)}
                  </span>
               )}
            </div>
            <div className='items-center gap-x-4 gap-y-1 grid grid-cols-4'>
               <Label htmlFor='description' className='text-right'>
                  Description
               </Label>
               <Textarea
                  placeholder='Description of the meeting'
                  id='description'
                  name='description'
                  className='col-span-3 max-h-40'
               />
            </div>
            <div className='items-center gap-x-4 gap-y-1 grid grid-cols-4'>
               <Label htmlFor='start_time' className='text-right'>
                  Start Date/Time
               </Label>
               <Input
                  required
                  defaultValue={new Date().toISOString().slice(0, 16)}
                  type='datetime-local'
                  name='start_time'
                  className='col-span-3'
               />
               {state.errors?.start_time && (
                  <span className='col-start-2 col-end-5 text-red-500 text-sm'>
                     {state.errors.start_time.at(0)}
                  </span>
               )}
            </div>
            <div className='items-center gap-x-4 gap-y-1 grid grid-cols-4'>
               <Label htmlFor='end_time' className='text-right'>
                  End Date/Time
               </Label>
               <Input
                  required
                  defaultValue={new Date().toISOString().slice(0, 16)}
                  type='datetime-local'
                  name='end_time'
                  className='col-span-3'
               />
               {state.errors?.end_time && (
                  <span className='col-start-2 col-end-5 text-red-500 text-sm'>
                     {state.errors.end_time.at(0)}
                  </span>
               )}
            </div>
            <div className='items-center gap-x-4 gap-y-1 grid grid-cols-4'>
               <Label htmlFor='invitees' className='text-right'>
                  Invitees
               </Label>
               <InviteesForm error={state.errors?.invitees?.at(0)} />
            </div>
            <div className='items-center gap-x-4 gap-y-1 grid grid-cols-4'>
               <SubmitButton
                  className='col-start-2'
                  loadingMessage='Creating...'
               >
                  Create Meeting
               </SubmitButton>
            </div>
         </form>
      </main>
   )
}
export default CreateSchedule
