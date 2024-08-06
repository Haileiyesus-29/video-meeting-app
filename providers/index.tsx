'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './AuthProvider'

const queryClient = new QueryClient()

function Provider({ children }: { children: React.ReactNode }) {
   return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
   )
}
export default Provider
