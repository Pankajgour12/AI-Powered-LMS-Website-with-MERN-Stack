import React from 'react'
import Navbar from '../component/Navbar.jsx'

const Home = () => {
  return (
    <div className='w-[100%] overflow-hidden'>
      <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>
        <Navbar/>
        
        <span className='lg:text-[70px] absolute md:text-[40%]
        lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center text-black font-bold text-[20px]' >Grow Skills to Advance</span>
         <span className='lg:text-[70px] absolute md:text-[40%]
        lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-black font-bold text-[20px]'>Your Career Path</span>
      </div>

    </div>
  )
}

export default Home
