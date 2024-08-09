'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog'
import { useFormState } from 'react-dom'
import SubmitButton from './SubmitButton'
import { createGroup } from '@/actions/group/create-group'
import { useState } from 'react'
import Members from './InviteesForm'

const initialState = {
   message: null,
   errors: null,
}

function CreateGroup() {
   const [state, action] = useFormState<any, any>(createGroup, initialState)
   const [members, setMembers] = useState<string[]>([])

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log('submitting')
   }

   return (
      <Dialog modal={true}>
         <DialogTrigger asChild>
            <Button variant='default'>Create New Group</Button>
         </DialogTrigger>
         <DialogContent className='sm:max-w-[425px]'>
            <form onSubmit={handleSubmit}>
               <DialogHeader>
                  <DialogTitle>Create New Group</DialogTitle>
                  <DialogDescription>
                     Create a new group meeting group.
                  </DialogDescription>
               </DialogHeader>
               <div className='gap-4 grid py-4'>
                  <div className='items-center gap-4 grid grid-cols-4'>
                     <Label htmlFor='title' className='text-right'>
                        Group Title
                     </Label>
                     <Input id='title' name='title' className='col-span-3' />
                  </div>
                  <div className='items-center gap-4 grid grid-cols-4'>
                     <Label htmlFor='description' className='text-right'>
                        Description
                     </Label>
                     <Textarea
                        id='description'
                        name='description'
                        className='col-span-3 max-h-40'
                     />
                  </div>
                  <Members members={members} setMembers={setMembers} />
               </div>
               <DialogFooter>
                  <SubmitButton loadingMessage='Creating group ...'>
                     Create Group
                  </SubmitButton>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
}

export default CreateGroup
