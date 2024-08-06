import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'
import AuthProvider from '@/providers/AuthProvider'

async function layout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <AuthProvider>
         <div className='gap-2 grid grid-cols-[min-content,_1fr] grid-rows-[min-content,_1fr] p-4 h-full container'>
            <Navbar />
            <Sidebar />
            <main className='relative bg-white p-4 rounded-lg overflow-y-auto'>
               {children}
            </main>
         </div>
      </AuthProvider>
   )
}

export default layout
