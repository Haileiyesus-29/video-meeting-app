import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'

function layout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <div className='gap-2 grid grid-cols-[min-content,_1fr] grid-rows-[min-content,_1fr] p-4 h-full'>
         <Navbar />
         <Sidebar />
         <main className='bg-white p-4 rounded-lg overflow-y-auto'>
            {children}
         </main>
      </div>
   )
}

export default layout
