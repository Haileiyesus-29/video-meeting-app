'use client'
import { BookCheck, Group, History, HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Sidebar() {
   const path = usePathname()
   const setClassNames = (pathname: string) => {
      return path === pathname
         ? 'flex gap-2 bg-gray-300/70 px-4 py-2 rounded-md text-zinc-700'
         : 'flex gap-2 hover:bg-gray-200/70 px-4 py-2 rounded-md text-zinc-700 hover_anim'
   }

   return (
      <aside className='bg-white p-4 rounded-lg w-52'>
         <ul className='flex flex-col gap-2'>
            <Link href='/' className={setClassNames('/')}>
               <HomeIcon />
               Home
            </Link>
            <Link href='/meetings' className={setClassNames('/meetings')}>
               <BookCheck />
               Meetings
            </Link>
            {/* <Link href='/groups' className={setClassNames('/groups')}>
               <Group />
               Groups
            </Link> */}
            <Link href='/history' className={setClassNames('/history')}>
               <History />
               History
            </Link>
         </ul>
      </aside>
   )
}
export default Sidebar
