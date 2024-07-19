'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'

function Navbar() {
   const router = useRouter()

   return (
      <header className='col-span-full bg-white p-2 rounded-lg basis-60'>
         <nav className='flex justify-between gap-2 px-4'>
            <div className='flex items-center gap-2'>
               <Avatar>
                  <AvatarImage src='' />
                  <AvatarFallback>LG</AvatarFallback>
               </Avatar>
               <h4 className='scroll-m-20 text-xl tracking-tight'>
                  Video-Meet-App
               </h4>
            </div>

            <div className='flex items-center gap-2 rounded-md cursor-pointer'></div>
         </nav>
      </header>
   )
}
export default Navbar
