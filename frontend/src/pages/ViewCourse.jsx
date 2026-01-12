import React, { useEffect, useState } from 'react'
import {FaArrowLeftLong, FaCirclePlay, FaLock, FaStar} from 'react-icons/fa6' 
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedCourse } from '../redux/courseSlice';
import axios from 'axios'
import { serverUrl } from '../App';

import empty from '../assets/empty.jpg'
import Card from '../component/Card';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';




const ViewCourse = () => {
const navigate = useNavigate()
const {courseId} = useParams()
const {courseData} = useSelector(state=>state.course)
const {selectedCourse} = useSelector(state=>state.course)
const {userData} = useSelector(state=>state.user)

  
const [selectedLecture, setSelectedLecture] = useState(null)
const [creatorData, setCreatorData] = useState(null)
const [creatorCourses, setCreatorCourses] = useState(null)
const [isEnrolled, setIsEnrolled] = useState(false)

const [rating, setRating] = useState(0)
const [comment, setComment] = useState('')
const [loading, setLoading] = useState(false)




const dispatch = useDispatch()


const fetchCourseData = () => {
   if (!courseData?.courses) return

  const course = courseData.courses.find(
    (course) => course._id === courseId
  )

  if (course) {
    dispatch(setSelectedCourse(course))
  }
}


const checkEnrolled = ()=>{
    const verify = userData?.enrolledCourses?.some(c => (typeof c === 'string' ? c : c._id).toString() === courseId?.toString()) 
    
    if(verify) setIsEnrolled(true)
}




useEffect(()=>{
    
    const handleCreator = async () =>{

        if(selectedCourse?.creator){
        try {
            const result = await axios.post(serverUrl + '/api/course/creator',{userId:selectedCourse?.creator}, {withCredentials:true});
           
             (setCreatorData(result.data))

        } catch (error) {
            console.log(error);
            
        }
    }
    }
    handleCreator();
},[selectedCourse])

useEffect(()=>{
    fetchCourseData();
    checkEnrolled();

},[courseData,courseId,userData])



// useEffect(()=>{

//     if(creatorData?._id && courseData.length >0){
//         const creatorCourse = courseData.filter((course)=>
//             course.creator === creatorData?._id && course._id !== courseId
        
//         )
   
//        setCreatorCourses(creatorCourse)
//     }

// },[creatorData ,courseData])

useEffect(() => {
 if (!creatorData?._id || !courseData?.courses) return

  const creatorCoursesFiltered = courseData.courses.filter(
    (course) =>
      course.creator === creatorData._id &&
      course._id !== courseId
  )

  setCreatorCourses(creatorCoursesFiltered)
}, [creatorData, courseData, courseId])



const handleEnroll = async(courseId,userId)=>{
    try {
        const orderData = await axios.post(serverUrl + '/api/order/razorpay-order',{userId , courseId},{withCredentials:true})
        console.log(orderData);

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount:orderData.data.amount,
            name:"LEARNFLOW",
            description:"COURSE ENROLLMENT PAYMENT",
            order_id: orderData.data.id,
            handler: async function (response) {
                console.log("RazorPay Response",response);

                try {
                    const verifyPayment = await axios.post(serverUrl + '/api/order/verifypayment',{
                        ...response,
                        courseId,
                        userId
                        
                    },{withCredentials:true})

                    setIsEnrolled(true)
                    toast.success(verifyPayment.data.message)

                } catch (error) {
                    console.log(error);
                    toast.error(error.response.data.message)
                    
                }
            }
            


        }
        const rzp = new window.Razorpay(options)
        rzp.open()


    } catch (error) {
        console.log(error);
        toast.error('Something went wrong while enrolling.')
    }

}

const handleReview = async ()=>{
    setLoading(true)
    try {
        const result = await axios.post(serverUrl + '/api/review/createreview',{rating,comment,courseId},{withCredentials:true})
         setLoading(false)
        console.log(result.data);
        toast.success(result.data.message)
        setRating(0)
        setComment('')

        

    } catch (error) {
        console.log(error);
        setLoading(false)
        toast.error(error.response.data.message)
        setRating(0)
        setComment('')
    }




}


const calculateAvgReview = (reviews) =>{
    if(!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum , review)=>sum + review.rating, 0)
    return (total/reviews.length).toFixed(1)
}

const avgRating = calculateAvgReview(selectedCourse?.reviews)








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
                           {avgRating}<FaStar/>
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

                   {!isEnrolled ? <button className='bg-black text-white
                    px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer'
                    onClick={()=>handleEnroll(courseId,userData._id)}
                    >
                        Enroll Now
                    </button> :
                     <button className='bg-green-100 text-green-600
                    px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer'
                    onClick={()=>navigate(`/viewlecture/${courseId}`)}
                    >
                        Watch  Now
                    </button>
                    }




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

     <div className='bg-white w-full md:w-2/5  p-6 rounded-2xl shadow-lg border bordgra200 '>

<h2 className='text-xl font-bold mb-1 text-gray-800'>Course Curriculum</h2>
<p className='text-sm text-gray-500 mb-4'>
{selectedCourse?.lectures?.length} Lectures

</p>

<div className='flex flex-col gap-3'>
    {selectedCourse?.lectures?.map((lecture,index)=>(


<button key={index}
disabled={!lecture.isPreviewFree}
onClick={()=>{
    if(lecture.isPreviewFree){
        setSelectedLecture(lecture)

}
}}
className={`
flex items-center justify-between  px-4
py-3 rounded-lg border transition-all text-black duration-200 text-left

${lecture.isPreviewFree?'hover:bg-gray-100 cursor-pointer border-gray-300' :
    "cursor-not-allowed opacity-60 border-gray-200"
}

${selectedLecture?.lectureTitle === lecture?.lectureTitle ?"bg-gray-300 border-gray-400" : ""}
`}>
   
    <span className='text-sm font-medium  text-gray-800'>{index+1}{". "}
    {lecture.lectureTitle}</span>

     <span className='text-lg text-gray-700'>

       {lecture.isPreviewFree ? <FaCirclePlay color='green'/>  :<FaLock color='black'/>}
    </span>
    
</button>
    
    ))}
    



      </div>
     </div>


     <div className='bg-white w-full md:w-3/5 p-6
     rounded-2xl shadow-lg border border-gray-200'>

        <div className='aspect-video w-full rounded-lg overflow-hidden 
        mb-4 bg-black flex items-center justify-center
        '>
            {selectedLecture?.videoUrl ? <video className='w-full h-full object-cover'
            src={selectedLecture?.videoUrl}
            controls
            /> :
            
            <span className='text-white text-sm '>
                Select a preview lecture to watch 

            </span>
            }

        </div>

     </div>





       </div>

       <div className='mt-4 border-t pt-6'>
        <h2 className='text-xl font-semibold mb-2'>Write a Review</h2>
        <div className='mb-4'>
            <div className='flex gap-1 mb-2'>
                {
                [1,2,3,4,5].map((star)=>(
                    <FaStar key={star}
                    onClick={()=>setRating(star)}
                    
                    className={star <= rating ? "fill-amber-400":
                        "fill-gray-300 hover:fill-amber-400 cursor-pointer transition"


                    }
                    
                    />
                )
                )}

            </div>
            <textarea
            onChange={(e)=>setComment(e.target.value)} value={comment}
            className='w-full border border-gray-300 rounded-lg p-2'
            placeholder='Write your review here...'
            rows={3}
            >

            </textarea>
            <button
            disabled={loading}
            onClick={handleReview}
            className='bg-black text-white mt-3 px-4 py-2 rounded hover:bg-gray-800'>
            {loading? <ClipLoader size={30} color='white'/> : "Submit Review"}
            </button>

        </div>


       </div>


       {/* for creator Information  */}
        <div className='flex items-center gap-4 pt-4 border-t'>

        {creatorData?.photoUrl ? <img src={creatorData?.photoUrl} alt="" 
        className='w-16 h-16 rounded-full object-cover border border-gray-300'
        />: 
         <img src={empty} alt=""
        className='w-16 h-16 rounded-full object-cover border border-gray-300'
          />
        }
            <div>
                <h2 className=' text-lg font-semibold'>
                    {creatorData?.name}
                </h2>
                <p className='md:text-sm text-gray-700 text-[10px]'>
                    {creatorData?.description}
                </p>
                <p className='md:text-sm text-gray-700 text-[10px]'>
                    {creatorData?.email}
                </p>
            </div>

        </div>


        <div>
            <p className='text-xl font-semibold mb-2'>Other Published Courses by the Educator -</p>
        </div>

        <div className='w-full transition-all duration-300 py-[20px] flex items-start justify-center
        lg:justify-start flex-wrap gap-6 lg:px-[18px]'>

     {
        creatorCourses?.map((course,index)=>(
            <Card key={index} 
            thumbnail={course.thumbnail} id={course._id} 
            price={course.price} title={course.title} category={course.category}
            
            
            />
        ))
     }


            
        </div>






   </div>












    </div>
  )
}

export default ViewCourse
