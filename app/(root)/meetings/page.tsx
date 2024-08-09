import CreateSchedule from '@/components/shared/createSchedule'
import { Button } from '@/components/ui/button'
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table'

const meetings = [
   {
      date: '2022-10-01',
      time: '10:00 AM',
      audience: 'Team A',
      title: 'Project Kickoff',
   },
   {
      date: '2022-10-05',
      time: '2:00 PM',
      audience: 'Team B',
      title: 'Sprint Planning',
   },
   {
      date: '2022-10-10',
      time: '3:00 PM',
      audience: 'Team C',
      title: 'Design Review',
   },
   {
      date: '2022-10-15',
      time: '4:00 PM',
      audience: 'Team D',
      title: 'Product Demo',
   },
   {
      date: '2022-10-20',
      time: '5:00 PM',
      audience: 'Team E',
      title: 'Retrospective',
   },
]

function Meetings() {
   return (
      <section className=''>
         <div className='right-10 bottom-10 absolute'>
            <CreateSchedule />
         </div>
         <div className='p-8'>
            <Table>
               <TableCaption>
                  A list of upcoming meeting schedules.
               </TableCaption>
               <TableHeader>
                  <TableRow>
                     <TableHead className='w-[100px]'>Date</TableHead>
                     <TableHead className='w-[100px]'>Time</TableHead>
                     <TableHead>Audience</TableHead>
                     <TableHead>Title</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {meetings.map((meeting, index) => (
                     <TableRow key={index}>
                        <TableCell className='font-medium'>
                           {meeting.date}
                        </TableCell>
                        <TableCell>{meeting.time}</TableCell>
                        <TableCell>{meeting.audience}</TableCell>
                        <TableCell>{meeting.title}</TableCell>
                        <TableCell className='w-40'>
                           <Button variant='destructive'>Cancel</Button>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
      </section>
   )
}
export default Meetings
