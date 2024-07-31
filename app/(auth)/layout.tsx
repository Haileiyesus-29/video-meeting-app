function AuthLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <main className='py-10 h-full min-h-svh'>
         <section className='flex justify-center items-center bg-white p-10 rounded-lg h-full'>
            {children}
         </section>
      </main>
   )
}

export default AuthLayout
