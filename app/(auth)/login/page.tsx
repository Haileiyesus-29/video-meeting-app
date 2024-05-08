import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginForm() {
   return (
      <Card className='mx-auto max-w-sm'>
         <CardHeader>
            <CardTitle className='text-2xl'>Login</CardTitle>
            <CardDescription>
               Enter your email below to login to your account
            </CardDescription>
         </CardHeader>
         <CardContent>
            <div className='gap-4 grid'>
               <div className='gap-2 grid'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                     id='email'
                     type='email'
                     placeholder='m@example.com'
                     required
                  />
               </div>
               <div className='gap-2 grid'>
                  <div className='flex items-center'>
                     <Label htmlFor='password'>Password</Label>
                     <Link
                        href='#'
                        className='inline-block ml-auto text-sm underline'
                     >
                        Forgot your password?
                     </Link>
                  </div>
                  <Input id='password' type='password' required />
               </div>
               <Button type='submit' className='w-full'>
                  Login
               </Button>
               <Button variant='outline' className='w-full'>
                  Login with Google
               </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
               Don&apos;t have an account?
               <Link href='/signup' className='px-2 underline'>
                  Sign up
               </Link>
            </div>
         </CardContent>
      </Card>
   )
}
