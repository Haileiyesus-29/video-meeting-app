'use client'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'

function SubmitButton({
   children,
   loadingMessage,
}: {
   children: React.ReactNode
   loadingMessage?: string
}) {
   const { pending } = useFormStatus()

   return (
      <Button className='w-full' type='submit' aria-disabled={pending}>
         {pending ? loadingMessage || 'Loading...' : children}
      </Button>
   )
}
export default SubmitButton
