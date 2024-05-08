import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'

function layout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <div className='gap-4 grid grid-cols-[min-content,_1fr] grid-rows-[min-content,_1fr] p-4 h-full'>
         <Navbar />
         <Sidebar />
         <main className='bg-white p-4 rounded-lg'>{children}</main>
      </div>
   )
}

export default layout
