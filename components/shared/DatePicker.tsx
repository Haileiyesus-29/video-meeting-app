'use client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover'

function DatePicker() {
   const [date, setDate] = useState<Date>()
   console.log(date)

   return (
      <Popover modal={true}>
         <PopoverTrigger asChild>
            <Button
               variant={'outline'}
               className={cn(
                  'w-[280px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
               )}
            >
               <CalendarIcon className='mr-2 w-4 h-4' />
               {date ? format(date, 'PP') : <span>Pick a date</span>}
            </Button>
         </PopoverTrigger>
         <PopoverContent className='p-0 w-auto'>
            <Calendar
               mode='single'
               selected={date}
               onSelect={setDate}
               initialFocus
            />
         </PopoverContent>
      </Popover>
   )
}

export default DatePicker
