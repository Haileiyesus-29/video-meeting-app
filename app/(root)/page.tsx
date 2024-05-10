import { Button } from '@/components/ui/button'

export default function Home() {
   return (
      <>
         <section className='flex justify-between gap-4 p-4'>
            <div className='flex flex-col justify-center items-center bg-gradient-to-br from-red-500/10 to-blue-500/10 px-4 py-8 rounded-lg grow'>
               <span className='font-semibold text-4xl'>251</span>
               <span className='px-2 text-lg italic'>minutes</span>
               <p className='text-gray-800/80'>In the last 7 days</p>
            </div>
            <div className='flex flex-col justify-center items-center bg-gradient-to-br from-red-500/10 to-blue-500/10 px-4 py-8 rounded-lg grow'>
               <span className='font-semibold text-4xl'>443</span>
               <span className='px-2 text-lg italic'>minutes</span>
               <p className='text-gray-800/80'>In the last 30 days</p>
            </div>
            <div className='flex flex-col justify-center items-center bg-gradient-to-br from-red-500/10 to-blue-500/10 px-4 py-8 rounded-lg grow'>
               <span className='font-semibold text-4xl'>4202</span>
               <span className='px-2 text-lg italic'>minutes</span>
               <p className='text-gray-800/80'>In the last 365 days</p>
            </div>
         </section>
         <section>
            <h2 className='p-4 text-3xl text-center leading-loose'>
               Start scheduling your video calls today and see the time you can
               save!
            </h2>
            <div className='flex justify-center p-4'>
               <Button variant='default'>Schedule a call</Button>
            </div>
         </section>
         <section className=''>
            <h3 className='text-2xl text-center underline leading-loose'>
               Happening now
            </h3>
            <ul className='divide-y max-h-72 overflow-y-auto'>
               {Array(10)
                  .fill(0)
                  .map((_, i) => (
                     <li
                        key={i}
                        className='flex justify-between items-center gap-4 p-2'
                     >
                        <h4 className='px-3 basis-1/4'>Team A</h4>
                        <p className='grow'>Project Kickoff</p>
                        <Button
                           variant='default'
                           className='bg-green-500 hover:bg-green-500/90 px-10'
                        >
                           Join
                        </Button>
                     </li>
                  ))}
            </ul>
         </section>
      </>
   )
}

// TODO: Add a hero section
{
   /* <div className='bg-gradient-to-r from-red-500/10 to-blue-500/10 p-8 rounded-lg'>
         <h1 className='text-6xl text-center text-gray-800/90 leading-relaxed'>
            The ultimate video call solution for all your needs 🚀
         </h1>
      </div> */
}
