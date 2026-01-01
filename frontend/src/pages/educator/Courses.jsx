import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

import { FaEdit } from "react-icons/fa";
import emptyImg  from "../../assets/empty.jpg"


const Courses = () => {
    const navigate = useNavigate()


  return (
    <div className='flex min-h-screen bg-black text-amber-50'>
  <div className='w-full min-h-screen p-4 sm:p-6 '>
      <div className='flex flex-col   bg-[#0b0f19]/80 backdrop-blur   border-white/10 sm:flex-row justify-between items-start sm:items-center border-b mb-6 gap-3'>


        <div className='flex items-center justify-center mb-4   border-white/10 gap-3'>

            <FaArrowLeftLong className='w-[22px] h-[22px] cursor-pointer'
            onClick={()=>navigate('/dashboard')}
            
            />
            
            <h1 className='text-2xl font-semibold'>All Created Courses</h1>


        </div>


        <button className='bg-white/10 mb-2 text-gray-200 px-4 py-2 rounded hover:bg-slate-700'
         onClick={()=>navigate('/create-courses')}
        >
            Create Courses
        </button>



      </div>
    

       






     



         {/* for Large Screen Table */}
         <div className='hidden md:block bg-amber-100 rounded-xl shadow p-4 overflow-x-auto text-gray-800'>

          <table className='min-w-full text-sm'>
            <thead className='border-b bg-white'>
                <tr>
                    <th className='text-left py-3 px-4' >Courses</th>
                    <th className='text-left py-3 px-4' > Price</th>
                    <th className='text-left py-3 px-4' >Status</th>
                    <th className='text-left py-3 px-4' >Action</th>
                </tr>


            </thead>

         <tbody>
            <tr className='border-b hover:bg-gray-50 transition duration-200'>
                <td className='py-3 px-4 flex items-center gap-4'>
                    <img src={emptyImg} alt=" EmptyImage"
                    className='w-30 h-16 object-cover rounded-md'
                    /> <span> Title</span>
                </td>

                <td className='px-4 py-3'>₹  NA</td> 

                <td className='px-4 py-3'><span className='px-3 py-1 rounded-full text-xs bg-red-100 text-red-600 '> Draft</span> </td>

                <td className='px-4 py-3'>
                    <FaEdit size={15} className='hover:text-blue-600 cursor-pointer'/>
                </td>

            </tr>
         </tbody>

          </table>

          <p className='text-center text-sm mt-6'>
            List of your recent courses.
          </p>
         







         </div>





    {/* for small screen table  */}
    <div className='md:hidden space-y-4'>

        <div className='bg-gray-600 rounded-lg shadow p-4 flex flex-col gap-3'>
        <div className='flex gap-4 items-center'>
          <img src={emptyImg} alt="emptyImg" className='w-16 h-16 rounded-md object-cover' />

           <div className='flex-1'>
            <h2 className='font-semibold text-sm'>Title</h2>
            <p className='text-white text-xs'>₹ NA</p>

           </div>
                    <FaEdit size={15} className='hover:text-blue-600 cursor-pointer'/>




        </div>

      
            <span className='w-fit px-3 py-1 rounded-full text-xs bg-red-100 text-red-600 '> Draft</span>

       

        </div>

        <p className='text-center text-sm mt-4'>
            List of your recent courses.
        </p>




    </div>



</div>


      </div>
  
  )





 
}

export default Courses
