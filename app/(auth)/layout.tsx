function AuthLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <div>
         <div>Login | Signup</div>
         <div>{children}</div>
      </div>
   )
}

export default AuthLayout
