'use client'

import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { X } from 'lucide-react'
import { Button } from '../ui/button'

type User = {
   name: string
   id: string
   email: string
}

function InviteesForm({ error }: { error?: string }) {
   const [inputValue, setInputValue] = useState('')
   const [selected, setSelected] = useState<User[]>([])
   const [searchResults, setSearchResults] = useState<User[]>([])

   useEffect(() => {
      if (!inputValue) {
         setSearchResults([])
         return
      }

      const timer = setTimeout(async () => {
         const response = await fetch(`/api/users/search?q=${inputValue}`)
         const users: User[] = await response.json()
         setSearchResults(users)
      }, 500)

      return () => clearTimeout(timer)
   }, [inputValue])

   const onRemoveInvitee = (id: string) => {
      setSelected(selected.filter(m => m.id !== id))
   }

   const onAddInvitee = (user: User) => {
      setSelected(selected.filter(i => i.id !== user.id).concat(user))
      setInputValue('')
   }

   return (
      <div className='relative flex flex-col gap-1 col-span-3'>
         {!!selected.length && (
            <div className='flex flex-wrap gap-2 p-2 border rounded-md'>
               {selected.map(u => (
                  <div
                     key={u.id}
                     className='flex items-center gap-2 bg-gray-200 pl-2 rounded-full'
                  >
                     <span>{u.email}</span>
                     <Button
                        type='button'
                        onClick={() => onRemoveInvitee(u.id)}
                        className='bg-gray-600 p-1 rounded-full w-6 h-6 text-white'
                     >
                        <X size={20} />
                     </Button>
                  </div>
               ))}
            </div>
         )}
         <Input
            id='invitees'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
         />
         {error && <span className='text-red-600 text-sm'>{error}</span>}

         {!!searchResults.length && (
            <div className='top-full left-0 absolute flex flex-col gap-1 bg-white mt-2 p-2 border rounded-lg w-full max-h-52 overflow-y-auto'>
               {searchResults.map(user => (
                  <div
                     key={user.id}
                     onClick={() => onAddInvitee(user)}
                     className='bg-gray-300 hover:bg-gray-200 px-2 py-1 rounded-md transition cursor-pointer'
                  >
                     <h4 className='leading-none'>{user.name}</h4>
                     <p className='text-gray-800/80 text-sm'>{user.email}</p>
                  </div>
               ))}
            </div>
         )}

         <Input
            name='invitees'
            type='hidden'
            value={JSON.stringify(selected.map(u => u.id))}
         />
      </div>
   )
}
export default InviteesForm
