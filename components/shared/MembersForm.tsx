import { useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Plus, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function Members({
   members,
   setMembers,
}: {
   members: string[]
   setMembers: React.Dispatch<React.SetStateAction<string[]>>
}) {
   const addMemberInput = useRef<HTMLInputElement>(null)
   const [memberError, setMemberError] = useState<string | null>(null)

   const onRemoveMember = (email: string) => {
      setMembers(prev => prev.filter(m => m !== email))
   }

   const onAddMember = () => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
      let value = addMemberInput.current?.value.trim()
      if (!value || !regex.test(value)) {
         setMemberError('Invalid email address')
         addMemberInput.current?.focus()
         return
      } else {
         setMemberError(null)
      }

      setMembers(prev =>
         prev
            .filter(m => m.toLowerCase() !== value?.trim().toLowerCase())
            .concat(value)
      )
      if (addMemberInput.current) addMemberInput.current.value = ''
   }

   return (
      <div className='items-center gap-4 grid grid-cols-4'>
         <Label htmlFor='members' className='text-right'>
            Members
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
                        onClick={() => onRemoveMember(m)}
                        className='bg-gray-600 p-1 rounded-full w-6 h-6 text-white'
                     >
                        <X size={20} />
                     </Button>
                  </div>
               ))}
            </div>

            <div className='flex'>
               <Input
                  ref={addMemberInput}
                  id='members'
                  name='members'
                  placeholder='Add members'
                  className='rounded-r-none grow'
               />
               <Button
                  onClick={onAddMember}
                  type='button'
                  className='rounded-l-none w-full basis-16 shrink'
               >
                  <Plus size={20} />
               </Button>
            </div>
            {memberError && (
               <span className='text-red-600 text-sm'>{memberError}</span>
            )}
         </div>
      </div>
   )
}

export default Members
