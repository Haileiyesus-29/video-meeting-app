import { HomeIcon } from 'lucide-react'
import Link from 'next/link'

function Sidebar() {
   return (
      <aside className='bg-white p-4 rounded-lg w-52'>
         <ul className='flex flex-col gap-2'>
            <Link
               href='/'
               className='flex gap-2 hover:bg-gray-200/70 px-4 py-2 rounded-md'
            >
               <HomeIcon />
               Home
            </Link>
            <Link
               href='/'
               className='flex gap-2 hover:bg-gray-200/70 px-4 py-2 rounded-md'
            >
               <HomeIcon />
               Upcoming
            </Link>
            <Link
               href='/'
               className='flex gap-2 hover:bg-gray-200/70 px-4 py-2 rounded-md'
            >
               <HomeIcon />
               History
            </Link>
            <Link
               href='/'
               className='flex gap-2 hover:bg-gray-200/70 px-4 py-2 rounded-md'
            >
               <HomeIcon />
               Groups
            </Link>
            <Link
               href='/'
               className='flex gap-2 hover:bg-gray-200/70 px-4 py-2 rounded-md'
            >
               <HomeIcon />
               Profile
            </Link>
            <Link
               href='/'
               className='flex gap-2 hover:bg-gray-200/70 px-4 py-2 rounded-md'
            >
               <HomeIcon />
               Settings
            </Link>
         </ul>
      </aside>
   )
}
export default Sidebar
