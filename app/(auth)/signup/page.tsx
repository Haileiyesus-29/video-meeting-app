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
            <CardTitle className='text-xl'>Sign Up</CardTitle>
            <CardDescription>
               Enter your information to create an account
            </CardDescription>
         </CardHeader>
         <CardContent>
            <div className='gap-4 grid'>
               <div className='gap-4 grid grid-cols-2'>
                  <div className='gap-2 grid'>
                     <Label htmlFor='first-name'>First name</Label>
                     <Input id='first-name' placeholder='Max' required />
                  </div>
                  <div className='gap-2 grid'>
                     <Label htmlFor='last-name'>Last name</Label>
                     <Input id='last-name' placeholder='Robinson' required />
                  </div>
               </div>
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
                  <Label htmlFor='password'>Password</Label>
                  <Input id='password' type='password' />
               </div>
               <Button type='submit' className='w-full'>
                  Create an account
               </Button>
               <Button variant='outline' className='w-full'>
                  Sign up with Google
               </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
               Already have an account?
               <Link href='/login' className='px-2 underline'>
                  Sign in
               </Link>
            </div>
         </CardContent>
      </Card>
   )
}
