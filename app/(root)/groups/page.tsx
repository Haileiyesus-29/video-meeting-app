import { Button } from '@/components/ui/button'

async function Groups() {
   return (
      <>
         <section className='p-4'>
            <div className='flex items-center gap-4 mx-auto max-w-md'>
               <input
                  type='search'
                  placeholder='Search groups'
                  className='p-2 border rounded-md w-full'
               />
               <Button className='px-8'>Search</Button>
            </div>
         </section>
         <section className='flex flex-wrap gap-4 h-[90%] overflow-y-auto'>
            {Array(15)
               .fill(0)
               .map((_, i) => (
                  <div
                     key={i}
                     className='flex flex-col gap-2 p-2 border rounded-md max-w-80'
                  >
                     <h3 className='text-4xl leading-snug'>Team exls</h3>
                     <p className='text-gray-800/90'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Suscipit est nostrum nesciunt.
                     </p>
                     <div className='flex justify-between items-center pt-2 border-t'>
                        <span className='font-semibold text-gray-800/90'>
                           23 members
                        </span>
                        <Button variant='outline' className='px-8'>
                           Edit
                        </Button>
                     </div>
                  </div>
               ))}
         </section>
      </>
   )
}
export default Groups
