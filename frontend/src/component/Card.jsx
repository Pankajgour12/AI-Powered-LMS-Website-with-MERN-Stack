import React from 'react'
import { FaStar } from 'react-icons/fa6'

const Card = ({thumbnail , title, category, price,}) => {
  return (
    <div className='group max-w-sm w-full bg-amber-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border border-gray-200'>
      <div className='relative overflow-hidden'>
        <img src={thumbnail} alt={title} className='w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105'/>
        <div className='absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      </div>
      
      <div className='p-2 space-y-1'>
        <h2 className='text-lg font-semibold text-gray-800'>{title}</h2>
        <p className='text-sm px-2 py-0.5 bg-white/60 rounded-full text-gray-800 capitalize inline-block'>{category}</p>

        <div className='flex justify-between items-center mt-3'>
          <span className='text-base font-bold text-gray-900'>₹ {price}</span>
          <span className='flex items-center gap-1 text-sm text-gray-700'> <FaStar className=' text-amber-400'/> 4 </span>
        </div>

      </div>

    </div>
  )
}

export default Card
