import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react'

function Navbar() {
   return (
      <header className='col-span-full bg-white p-2 rounded-lg basis-60'>
         <nav className='flex justify-between gap-2 px-4'>
            <div className='flex items-center gap-2'>
               <Avatar>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback>CN</AvatarFallback>
               </Avatar>
               <h4 className='scroll-m-20 text-xl tracking-tight'>John Snow</h4>
            </div>

            <Link
               href='/logout'
               className='flex items-center gap-2 rounded-md hover_anim'
            >
               Logout
               <LogOut />
            </Link>
         </nav>
      </header>
   )
}
export default Navbar
