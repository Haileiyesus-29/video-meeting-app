import {
   BookCheck,
   Group,
   History,
   HomeIcon,
   Settings2,
   UserRound,
} from 'lucide-react'
import Link from 'next/link'

function Sidebar() {
   return (
      <aside className='bg-white p-4 rounded-lg w-52'>
         <ul className='flex flex-col gap-2'>
            <Link
               href='/'
               className='flex gap-2 hover:bg-gray-200/70 px-4 py-2 rounded-md text-zinc-700 hover_anim'
            >
               <HomeIcon />
               Home
            </Link>
            <Link
               href='/upcoming'
               className='flex gap-2 hover:bg-gray-200/70 px-4 py-2 rounded-md text-zinc-700 hover_anim'
            >
               <BookCheck />
               Upcoming
            </Link>
            <Link
               href='/groups'
               className='flex gap-2 hover:bg-gray-200/70 px-4 py-2 rounded-md text-zinc-700 hover_anim'
            >
               <Group />
               Groups
            </Link>
            <Link
               href='/history'
               className='flex gap-2 hover:bg-gray-200/70 px-4 py-2 rounded-md text-zinc-700 hover_anim'
            >
               <History />
               History
            </Link>

            <Link
               href='/profile'
               className='flex gap-2 hover:bg-gray-200/70 px-4 py-2 rounded-md text-zinc-700 hover_anim'
            >
               <UserRound />
               Profile
            </Link>
            <Link
               href='/setting'
               className='flex gap-2 hover:bg-gray-200/70 px-4 py-2 rounded-md text-zinc-700 hover_anim'
            >
               <Settings2 />
               Setting
            </Link>
         </ul>
      </aside>
   )
}
export default Sidebar
