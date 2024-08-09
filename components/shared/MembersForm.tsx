import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const mochApi = async () => {
   await new Promise(r => setTimeout(r, 100))
   return [
      {
         name: 'John Doe',
         id: '1',
         email: 'john@email.com',
      },
      {
         name: 'Jane Doe',
         id: '2',
         email: 'jan3@email.com',
      },
   ]
}

type User = {
   name: string
   id: string
   email: string
}

function Invitees({
   members,
   setMembers,
}: {
   members: string[]
   setMembers: React.Dispatch<React.SetStateAction<string[]>>
}) {
   const [inputValue, setInputValue] = useState<string>('')
   const [searchResults, setSearchResults] = useState<User[]>([])

   useEffect(() => {
      if (!inputValue) {
         setSearchResults([])
         return
      }

      const timer = setTimeout(async () => {
         setSearchResults(await mochApi())
      }, 500)

      return () => clearTimeout(timer)
   }, [inputValue])

   const onRemoveInvitee = (email: string) => {
      setMembers(prev => prev.filter(m => m !== email))
   }

   const onAddInvitee = (user: User) => {
      setMembers(prev => prev.filter(p => p !== user.email).concat(user.email))
      setInputValue('')
   }

   return (
      <div className='items-center gap-4 grid grid-cols-4'>
         <Label htmlFor='members' className='text-right'>
            Invitees
         </Label>
         <div className='flex flex-col gap-2 col-span-3'>
            <div className='flex flex-wrap gap-2'>
               {members.map((m, i) => (
                  <div
                     key={m}
                     className='flex items-center gap-2 bg-gray-200 pl-2 rounded-full'
                  >
                     <span>{m}</span>
                     <Button
                        type='button'
                        onClick={() => onRemoveInvitee(m)}
                        className='bg-gray-600 p-1 rounded-full w-6 h-6 text-white'
                     >
                        <X size={20} />
                     </Button>
                  </div>
               ))}
            </div>

            <div className='relative'>
               <Input
                  onChange={e => setInputValue(e.target.value)}
                  value={inputValue}
                  id='invitees'
                  name='invitees'
                  placeholder='Add invitees'
               />

               {!!searchResults.length && (
                  <div className='top-full left-0 absolute flex flex-col gap-1 bg-white p-2 border rounded-lg w-full max-h-52 overflow-y-auto'>
                     {searchResults.map(user => (
                        <div
                           key={user.id}
                           onClick={() => onAddInvitee(user)}
                           className='bg-gray-300 hover:bg-gray-200 px-2 py-1 rounded-md transition cursor-pointer'
                        >
                           <h4 className='leading-none'>{user.name}</h4>
                           <p className='text-gray-800/80 text-sm'>
                              {user.email}
                           </p>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default Invitees
