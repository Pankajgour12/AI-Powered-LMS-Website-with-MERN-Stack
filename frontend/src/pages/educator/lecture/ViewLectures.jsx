import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import { serverUrl } from '../../../App'
import { FaArrowLeftLong } from 'react-icons/fa6'



function ViewLectures(){
 const {courseId} = useParams()
 const {courseData} = useSelector(state => state.course)
 console.log(courseData);
 const {userData} = useSelector(state => state.user)
 const selectedCourse = courseData?.courses?.find(
  (course) => course._id === courseId
)
console.log(selectedCourse);
 const [creatorData, setCreatorData] = useState(null)
  const [selectedLecture, setSelectedLecture] = useState(selectedCourse?.lectures?.[0] || null)
 

 
 const navigate = useNavigate()


useEffect(()=>{
    
    const handleCreator = async () =>{

        if(selectedCourse?.creator){
        try {
            const result = await axios.post(serverUrl + '/api/course/creator',{userId:selectedCourse?.creator}, {withCredentials:true})
            console.log(result.data);
           (setCreatorData(result.data))

        } catch (error) {
            console.log(error);
            
        }
    }
    }
    handleCreator();
},[selectedCourse])

  return (
    <div className='min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6 '>
         
       {/* left or top */}
      <div className='w-full md:2/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200'>

        <div className='mb-6'>
          <h2 className='text-2xl font-bold flex items-center justify-start gap-[20px] text-gray-800  '
          
          > <FaArrowLeftLong className='text-black w-[22px] h-[22px] cursor-pointer  ' 
          onClick={()=>navigate('/')}/>
            
            {selectedCourse?.title}</h2>

            <div className='mt-2 flex gap-4 text-sm text-gray-500 font-medium '>

              <span>Category : {selectedCourse?.category}</span>

              <span>Level : {selectedCourse?.level} </span>
            </div>
         
        </div>
    

      {/* video player  */}
        <div className='aspect-video bg-black rounded-xl overflow-hidden mb-4 border border-gray-300'>
          {selectedLecture?.videoUrl ? <video className='w-full h-full object-cover' src={selectedLecture?.videoUrl} controls /> :
          <div className='flex items-center justify-center h-full text-white'>
            Select a lecture to start watching 
          </div>
          }

        </div>
        <div className='mt-2'>
          <h2 className='text-xl font-semibold text-gray-800'>  {selectedLecture?.lectureTitle} </h2>
        </div>

      </div>

    </div>
  )
}

export default ViewLectures
