import React, { useEffect } from 'react'
import {FaArrowLeftLong, FaStar} from 'react-icons/fa6' 
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedCourse } from '../redux/courseSlice';


const ViewCourse = () => {
const navigate = useNavigate()
const {courseId} = useParams()
const {courseData} = useSelector(state=>state.course)
const {selectedCourse} = useSelector(state=>state.course)
 
console.log(courseData);
console.log(courseId);


const dispatch = useDispatch()


const fetchCourseData = () => {
//   if (!courseData?.courses) return

  const course = courseData.courses.find(
    (course) => course._id === courseId
  )

  if (course) {
    dispatch(setSelectedCourse(course))
  }
}




useEffect(()=>{
    fetchCourseData();
},[courseData,courseId])






  return (
    <div className='min-h-screen bg-gray-50 p-6'>
   <div className='max-w-6xl mx-auto bg-amber-50 shadow-md rounded-xl p-6 space-y-6 relative'>

      {/* top section  */}
       <div className='flex flex-col md:flex-row gap-10 justify-around'>

             {/* thumbnail */}

             <div className='w-full md:w-1/2'>
             <FaArrowLeftLong
    className='text-2xl text-gray-800 mb-4 cursor-pointer'
    onClick={() => navigate('/')}
           
             />

             {selectedCourse?.thumbnail ?  <img src={selectedCourse?.thumbnail} alt="Thumbnail" />:
                <div className='w-full h-48 bg-gray-300 flex items-center justify-center'>
                <span className='text-gray-600'>No Thumbnail Available</span>
                </div>
             
            }


               

                



             </div>

             {/* courseInfo */}
             <div className='flex-1 space-y-2 mt-[20px] '>
                <h2 className='text-2xl font-bold ' > {selectedCourse?.title} </h2>
                <p className='text-gray-700'> { selectedCourse?.subTitle}</p>
                <div className='flex items-start flex-col justify-between'>

                    <div className='text-yellow-500 font-medium flex gap-2'>

                        <span className='flex items-center justify-start gap-1'>
                           5 <FaStar/>
                              </span>
                        <span 
                        className='text-gray-400'>(27,000 Reviews) </span>

                    </div>


                    <div>
                        <span className='text-xl font-semibold text-black'>
                            ₹ {selectedCourse?.price}
                            {" "}
                        </span> 
                        <span className='line-through text-sm text-gray-500'> 
                         ₹ 5999 
                        </span>

                    </div>

                    <ul className='text-sm text-gray-700 space-y-1 pt-2'>
                        <li>✅ 250+ hours of Video content</li>
                        <li>✅ 18+ Inustry Projects</li>
                        <li>✅ Lifetime access to course materials</li>
                    </ul>

                    <button className='bg-black text-white
                    px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer'>
                        Enroll Now
                    </button>




                </div>



             </div>


       </div>

       <div>
        <h2 className='text-xl font-semibold mb-2'>
            Here's What You Will Gain
        </h2>
        <ul className='list-disc pl-6 text-gray-700 space-y-1'>
            <li>Learn {selectedCourse?.category} from Beginning </li>

        </ul>
       </div>

       <div>
        <h2 className='text-xl font-semibold mb-2'>
            Who This Course is For
        </h2>
        <p className=' text-gray-700'>
            Beginners, apiring developers, and professsionals looking to upgrade skills.

        </p>
       </div>


       {/* lectures Area  */}

       <div className='flex flex-col md:flex-row gap-6'>


       </div>




   </div>












    </div>
  )
}

export default ViewCourse
