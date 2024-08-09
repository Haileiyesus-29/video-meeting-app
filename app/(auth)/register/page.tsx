'use client'
import { register } from '@/actions/auth'
import SubmitButton from '@/components/shared/SubmitButton'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { XIcon } from 'lucide-react'
import Link from 'next/link'
import { useFormState } from 'react-dom'

const initialState = {
   message: null,
   errors: null,
}

type stateType = {
   message: string | null
   errors: {
      name?: string[] | undefined
      email?: string[] | undefined
      password?: string[] | undefined
      form?: string[] | undefined
      confirmPassword?: string[] | undefined
   } | null
}

export default function SignupForm() {
   const [state, action] = useFormState<stateType, FormData>(
      register,
      initialState
   )

   return (
      <form action={action}>
         <Card className='w-full max-w-sm'>
            <CardHeader>
               <CardTitle className='text-2xl'>Register</CardTitle>
               <CardDescription>
                  Enter your credentials below to register for an account.
               </CardDescription>
               {state?.errors?.form && (
                  <span className='text-red-600 text-sm'>
                     {state?.errors?.form[0]}
                  </span>
               )}
            </CardHeader>
            <CardContent className='gap-4 grid'>
               <div className='gap-2 grid'>
                  <Label htmlFor='name'>Name</Label>
                  <Input
                     id='name'
                     name='name'
                     type='text'
                     placeholder='e.g, John Doe'
                     required
                  />
                  {state?.errors?.name && (
                     <span className='text-red-600 text-sm'>
                        {state?.errors?.name[0]}
                     </span>
                  )}
               </div>
               <div className='gap-2 grid'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                     id='email'
                     name='email'
                     type='email'
                     placeholder='e.g, test@example.com'
                     required
                  />
                  {state?.errors?.email && (
                     <span className='text-red-600 text-sm'>
                        {state?.errors?.email[0]}
                     </span>
                  )}
               </div>
               <div className='gap-2 grid'>
                  <Label htmlFor='password'>Password</Label>

                  <Input
                     id='password'
                     name='password'
                     type='password'
                     placeholder='your password'
                     required
                  />
               </div>
               <div className='gap-2 grid'>
                  <Label htmlFor='cpassword'>Confirm Password</Label>

                  <Input
                     id='cpassword'
                     name='cpassword'
                     type='password'
                     placeholder='confirm password'
                     required
                  />
                  {state?.errors?.confirmPassword && (
                     <span className='text-red-600 text-sm'>
                        {state?.errors?.confirmPassword[0]}
                     </span>
                  )}
                  {state?.errors?.password &&
                     state.errors.password.map((error, index) => (
                        <span key={index} className='text-red-600 text-sm'>
                           {error}
                        </span>
                     ))}
               </div>
            </CardContent>
            <CardFooter className='flex flex-col gap-2'>
               <p aria-live='polite' className='sr-only'>
                  {state?.message}
               </p>
               <SubmitButton loadingMessage='Creating...'>
                  Create My Account
               </SubmitButton>
               <div className='flex justify-between px-1 text-sm self-stretch'>
                  <p>Already have an account?</p>
                  <Link
                     href='/login'
                     className='hover:text-blue-500/80 underline transition'
                  >
                     Login
                  </Link>
               </div>
            </CardFooter>
         </Card>
      </form>
   )
}
