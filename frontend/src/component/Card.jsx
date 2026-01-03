import React from 'react'
import { FaStar } from 'react-icons/fa6'

const Card = ({thumbnail , title, category, price,}) => {
  return (
    <div className='max-w-sm w-full bg-amber-50 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all
    duration-300 border border-gray-300'>
        <img src={thumbnail} alt={title} className='w-full h-48 object-cover'/>
        
        <div className='p-5 space-y-2'>
            <h2 className='text-lg font-semibold text-gray-800'>{title}</h2>
            <p className='text-sm px-2 py-0.5 bg-gray-100 rounded-full text-gray-800 capitalize'>{category}</p>

            <div className='flex justify-between  '>
    <span className='text-xl font-bold text-gray-900'>₹ {price}</span>
   <span className='flex items-center gap-1'> <FaStar className=' text-amber-400'/> 4 </span>

            </div>

        </div>


    </div>
  )
}

export default Card
