import React  from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'



function MyEnrolledCourses(){
  const { userData } = useSelector((state) => state.user)
  const navigate =  useNavigate()

  return (
   <div className='min-h-screen w-full px-4 py-9 bg-black/80 text-white/80'>
           <FaArrowLeftLong 
           className='absolute top-[5%] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer text-center'
              
           onClick={() => navigate('/')}
           />
         <h1 className='text-3xl text-center  font-bold'>
          My Enrolled Courses</h1>

          {
            userData.enrolledCourses.length === 0 ?(
              <p className='text-center pt-3 w-full'>
                You haven't enrolled in any courses yet.
              </p>
              
            ):(

              <div className='flex items-center justify-center pt-5 flex-wrap gap-[30px] '>
                {
                  userData?.enrolledCourses?.map((course , index)=>(
                   <div key={index}
                   className='bg-black/60 rounded-2xl shadow-md overflow-hidden
                   border '
                   >
                    <img src={course?.thumbnail} alt="course thumbnail" 
                    className='w-full h-40 object-cover'
                    />

                     <div className='p-4'>
                      <h2 className='text-xl font-semibold text-white/80 '> 
                        {course?.title}
                      </h2>
                      <p className='text-sm mb-1  text-white/50'>
                         {course?.category}
                      </p>
                      <p className='text-sm mb-1 text-white/50'>
                       {course?.level}
                      </p>
                      <h1 className='px-[10px] text-center py-[10px]
                           bg-white/20 border-white rounded-[10px]
                            text-[15px] font-light 
                            cursor-pointer gap-2 mt-[10px] hover:bg-white/50 text-white
                      
                      
                      '
                      onClick={()=>navigate(`/viewlecture/${course._id}`)}
                      
                      >
                        Watch Now
                      </h1>
                     </div>


                   </div>


                  ))
                }
                
                
                





              </div>
              
            )



          }
    </div>
  )
}

export default MyEnrolledCourses
