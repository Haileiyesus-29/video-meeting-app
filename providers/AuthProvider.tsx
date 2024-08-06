'use client'
import { createContext, useEffect, useState } from 'react'

export const authContext = createContext<{
   user: { id: string; name: string; email: string } | null
   loading: boolean
}>({
   user: null,
   loading: true,
})

function AuthProvider({ children }: { children: React.ReactNode }) {
   const [user, setUser] = useState<{
      id: string
      name: string
      email: string
   } | null>(null)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const fetchUserData = async () => {
         try {
            setLoading(true)
            const res = await fetch('/api/auth/me')
            const data = await res.json()
            setUser(data)
         } catch (error) {
            setUser(null)
         } finally {
            setLoading(false)
         }
      }

      fetchUserData()
   }, [])

   const value = {
      user,
      loading,
   }
   return <authContext.Provider value={value}>{children}</authContext.Provider>
}
export default AuthProvider
