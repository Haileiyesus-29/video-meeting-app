'use client'

import { useState } from 'react'
import { format } from 'date-fns'

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'

function TimePicker() {
   const [hour, setHour] = useState<string>()
   const [minute, setMinute] = useState<string>()

   return (
      <div className='flex gap-1'>
         <Select onValueChange={setHour} value={hour}>
            <SelectTrigger>
               <SelectValue placeholder='HH' />
            </SelectTrigger>
            <SelectContent>
               {Array(24)
                  .fill(0)
                  .map((_, i) => (
                     <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                        {i.toString().padStart(2, '0')}
                     </SelectItem>
                  ))}
            </SelectContent>
         </Select>
         <Select onValueChange={setMinute} value={minute}>
            <SelectTrigger>
               <SelectValue placeholder='MM' />
            </SelectTrigger>
            <SelectContent>
               {Array(12)
                  .fill(0)
                  .map((_, i) => (
                     <SelectItem
                        key={i}
                        value={(i * 5).toString().padStart(2, '0')}
                     >
                        {(i * 5).toString().padStart(2, '0')}
                     </SelectItem>
                  ))}
            </SelectContent>
         </Select>
      </div>
   )
}
export default TimePicker
