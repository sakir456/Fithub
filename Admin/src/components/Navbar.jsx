import { Dumbbell } from 'lucide-react';

const Navbar = () => {
  return (

    
    <div className="flex justify-between items-center px-4 sm:px-10 py-4 bg-white border-b">
    <div className='flex items-center gap-2 text-2xl font-semibold '>
       <Dumbbell className='h-8 w-8 text-red-600' />
       <span className='text-gray-800'>FITNESS GYM</span>
       </div>
       <div>
        <button className='bg-red-600 px-10 py-2 rounded-full text-white text-sm  '>Logout</button>
       </div>
      </div>
  )
}

export default Navbar