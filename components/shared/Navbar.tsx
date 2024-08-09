import { logout } from '@/actions/auth/logout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '../ui/button'
import { verifySession } from '@/lib/session'

async function Navbar() {
   const user = await verifySession()

   return (
      <header className='col-span-full bg-white p-2 rounded-lg basis-60'>
         <nav className='flex justify-between gap-2 px-4'>
            <div className='flex items-center gap-2'>
               <Avatar>
                  <AvatarImage src='' />
                  <AvatarFallback>
                     {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
               </Avatar>
               <h4 className='scroll-m-20 text-xl tracking-tight'>
                  {user.name}
               </h4>
            </div>

            <form action={logout}>
               <Button
                  type='submit'
                  variant='outline'
                  className='flex items-center gap-2 rounded-md cursor-pointer'
               >
                  Logout
               </Button>
            </form>
         </nav>
      </header>
   )
}
export default Navbar
