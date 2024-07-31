'use client'
import { login } from '@/actions/auth'
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
import Link from 'next/link'
import { useFormState } from 'react-dom'

const initialState = {
   message: null,
   errors: null,
}

export default function LoginForm() {
   const [state, action] = useFormState<any, any>(login, initialState)

   return (
      <form action={action}>
         <Card className='w-full max-w-sm'>
            <CardHeader>
               <CardTitle className='text-2xl'>Login</CardTitle>
               <CardDescription>
                  Enter your email below to login to your account.
               </CardDescription>
               {state?.errors && (
                  <span className='text-red-600 text-sm'>{state.errors}</span>
               )}
            </CardHeader>
            <CardContent className='gap-4 grid'>
               <div className='gap-2 grid'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                     id='email'
                     name='email'
                     type='email'
                     placeholder='m@example.com'
                     required
                  />
               </div>
               <div className='gap-2 grid'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                     id='password'
                     name='password'
                     type='password'
                     required
                  />
               </div>
            </CardContent>
            <CardFooter className='flex flex-col gap-2'>
               <SubmitButton loadingMessage='Logging in...'>Login</SubmitButton>
               <div className='flex justify-between px-1 text-sm self-stretch'>
                  <p>Do not have an account?</p>
                  <Link
                     href='/register'
                     className='hover:text-blue-500/80 underline transition'
                  >
                     Register
                  </Link>
               </div>
            </CardFooter>
         </Card>
      </form>
   )
}
