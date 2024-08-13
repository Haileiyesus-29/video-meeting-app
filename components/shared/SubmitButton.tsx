'use client'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'

function SubmitButton({
   children,
   loadingMessage,
   ...props
}: {
   children: React.ReactNode
   loadingMessage?: string
} & React.ComponentProps<typeof Button>) {
   const { pending } = useFormStatus()

   return (
      <Button {...props} type='submit' aria-disabled={pending}>
         {pending ? loadingMessage || 'Loading...' : children}
      </Button>
   )
}

export default SubmitButton
