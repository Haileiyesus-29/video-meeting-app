'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from 'react-dom'
import SubmitButton from './SubmitButton'
import { createGroup } from '@/actions/group/create-group'
import { useState } from 'react'
import Invitees from './InviteesForm'
import { PlusIcon } from 'lucide-react'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog'
import DatePicker from './DatePicker'
import TimePicker from './TimePicker'

const initialErrState = {
   message: null,
   errors: null,
}

const initialState = {
   startDate: undefined,
   endDate: undefined,
   startTime: { hour: '00', minute: '00' },
   endTime: { hour: '00', minute: '00' },
   title: '',
   description: '',
   invitees: [],
}

function CreateSchedule() {
   const [formState, action] = useFormState<any, any>(
      createGroup,
      initialErrState
   )
   const [state, dispatch] = useFormState<State, Action>(reducer, initialState)

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!state.startDate || !state.endDate)
         return console.log('Please select a date')

      const payload = {
         title: state.title,
         description: state.description,
         start_time: calcDate(state.startDate, state.startTime),
         end_time: calcDate(state.endDate, state.endTime),
         invitees: state.invitees,
      }

      console.log(payload)
   }

   return (
      <Dialog modal={true}>
         <DialogTrigger asChild>
            <Button className='rounded-full w-16 h-16'>
               <PlusIcon />
            </Button>
         </DialogTrigger>
         <DialogContent className='sm:max-w-[425px]'>
            <form onSubmit={handleSubmit}>
               <DialogHeader>
                  <DialogTitle>Create a meeting</DialogTitle>
                  <DialogDescription>Schedule a new meeting.</DialogDescription>
               </DialogHeader>
               <div className='gap-4 grid py-4'>
                  <div className='items-center gap-4 grid grid-cols-4'>
                     <Label htmlFor='title' className='text-right'>
                        Title
                     </Label>
                     <Input
                        id='title'
                        name='title'
                        className='col-span-3'
                        value={state.title}
                        onChange={e => {
                           dispatch({
                              type: 'SET_TITLE',
                              payload: e.target.value,
                           })
                        }}
                     />
                  </div>
                  <div className='items-center gap-4 grid grid-cols-4'>
                     <Label htmlFor='description' className='text-right'>
                        Description
                     </Label>
                     <Textarea
                        id='description'
                        name='description'
                        value={state.description}
                        onChange={e => {
                           dispatch({
                              type: 'SET_DESCRIPTION',
                              payload: e.target.value,
                           })
                        }}
                        className='col-span-3 max-h-40'
                     />
                  </div>
                  <div className='items-center gap-4 grid grid-cols-4'>
                     <Label htmlFor='start_date' className='text-right'>
                        Start Time
                     </Label>
                     <div className='flex gap-1 col-span-3'>
                        <DatePicker
                           date={state.startDate}
                           setDate={(date: Date | undefined) =>
                              dispatch({
                                 type: 'SET_START_DATE',
                                 payload: date,
                              })
                           }
                        />
                        <TimePicker
                           setTime={(time: {
                              time?: string
                              hour?: string
                           }) => {
                              dispatch({
                                 type: 'SET_START_TIME',
                                 payload: time,
                              })
                           }}
                           time={state.startTime}
                        />
                     </div>
                  </div>
                  <div className='items-center gap-4 grid grid-cols-4'>
                     <Label htmlFor='start_date' className='text-right'>
                        End Time
                     </Label>
                     <div className='flex gap-1 col-span-3'>
                        <DatePicker
                           date={state.endDate}
                           setDate={(date: Date | undefined) =>
                              dispatch({
                                 type: 'SET_END_DATE',
                                 payload: date,
                              })
                           }
                        />
                        <TimePicker
                           setTime={(time: {
                              time?: string
                              hour?: string
                           }) => {
                              dispatch({
                                 type: 'SET_END_TIME',
                                 payload: time,
                              })
                           }}
                           time={state.endTime}
                        />
                     </div>
                  </div>

                  <Invitees
                     invitees={state.invitees}
                     setInvitees={(update: string[]) => {
                        dispatch({
                           type: 'ADD_INVITEE',
                           payload: update,
                        })
                     }}
                  />
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

export default CreateSchedule

function reducer(state: State, action: Action): State {
   switch (action.type) {
      case 'SET_START_DATE':
         return { ...state, startDate: action.payload }
      case 'SET_END_DATE':
         return { ...state, endDate: action.payload }
      case 'SET_START_TIME': {
         const time = {
            hour: action.payload.hour || state.startTime.hour,
            minute: action.payload.minute || state.startTime.minute,
         }
         return { ...state, startTime: time }
      }
      case 'SET_END_TIME': {
         const time = {
            hour: action.payload.hour || state.endTime.hour,
            minute: action.payload.minute || state.endTime.minute,
         }
         return { ...state, endTime: time }
      }
      case 'SET_TITLE':
         return { ...state, title: action.payload }
      case 'SET_DESCRIPTION':
         return { ...state, description: action.payload }
      case 'ADD_INVITEE':
         return { ...state, invitees: action.payload }
      default:
         return state
   }
}

function calcDate(date: Date, time: { hour: string; minute: string }) {
   let newDate = new Date(date)
   newDate.setHours(parseInt(time.hour))
   newDate.setMinutes(parseInt(time.minute))
   return newDate.toUTCString()
}

type Action = {
   type:
      | 'SET_START_DATE'
      | 'SET_END_DATE'
      | 'SET_START_TIME'
      | 'SET_END_TIME'
      | 'SET_TITLE'
      | 'SET_DESCRIPTION'
      | 'ADD_INVITEE'
   payload: any
}

type State = {
   startDate?: Date
   endDate?: Date
   startTime: { hour: string; minute: string }
   endTime: { hour: string; minute: string }
   title: string
   description: string
   invitees: string[]
}
