import { Search } from 'lucide-react';
import { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const UserQueries = () => {
  const {queries} =  useContext(AdminContext)

  const [searchQuery, setsearchQuery] = useState("")

  const extractDateAndTime = (date)=> {
    const newDate = new Date(date)
    const day = newDate.getDate()
    const month = (newDate.getMonth() + 1) 
    const fullYear = newDate.getFullYear()

    const Hours = newDate.getHours()
    const minutes = newDate.getMinutes()
    const seconds = newDate.getSeconds()

    return `${day}/${month}/${fullYear}, ${Hours}:${minutes}:${seconds} `


  }

  const filteredQueries = queries.filter((item)=> {    
     const filterQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase())
     return filterQuery
  })  


  return queries && (
    <div className="w-full max-w-4xl  m-5">
    
         <div className="flex justify-between">
         <p className="mb-3 text-lg font-medium">User Queries</p>
         <div className='flex  items-center px-2  border rounded-md text-sm gap-1 text-gray-400 outline-double '>
         <div >
         <Search  />
         </div>
          <input value={searchQuery} onChange={(e)=> setsearchQuery(e.target.value)} type="text"  placeholder="Search Queries" className="outline-none"/>
          </div>
          </div>
          <div className='mt-5 flex flex-col gap-2 max-h-[80vh] overflow-y-scroll'>
          {
            filteredQueries.map((item,index)=>(
              <div className=' bg-white p-5 border rounded' key={index}>
              <div className='flex flex-col'>
              <div className='flex items-center gap-2 '>
              <img className='h-8 w-8 rounded-full' src={queries.image}/>
              <div className=''>
                <p className='font-medium'>{item.name}</p>
                <p className='text-sm text-gray-400'>{item.email}</p>
              </div>
              </div>
              <p className='mt-2 font-medium'>{item.subject}</p>
              <p className='text-sm flex fle-wrap  '>{item.message}</p>
              <div className='flex justify-between'>
              <p className='mt-5 text-sm text-gray-400 '>{extractDateAndTime(item.date)}</p>
              <button>{item.isCompleted ? "Read" : "Unread"}</button>
              </div>

              </div>

              </div>
            )) 
          }
          </div>
         
         
    </div>
  )
}

export default UserQueries