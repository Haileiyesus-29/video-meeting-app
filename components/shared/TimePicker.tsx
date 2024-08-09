'use client'

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'

type TimePickerProps = {
   setTime: ({ minute, hour }: { minute?: string; hour?: string }) => void
   time: {
      hour: string
      minute: string
   }
}

function TimePicker({ setTime, time }: TimePickerProps) {
   return (
      <div className='flex gap-1'>
         <Select
            onValueChange={val => setTime({ hour: val })}
            value={time.hour}
         >
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
         <Select
            onValueChange={val => setTime({ minute: val })}
            value={time.minute}
         >
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
