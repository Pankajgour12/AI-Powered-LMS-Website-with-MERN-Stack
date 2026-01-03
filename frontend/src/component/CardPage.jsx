import React, { useEffect, useState } from 'react'
import Card from './Card'
import { useSelector } from 'react-redux'

function CardPage()  {

    const {courseData} = useSelector(state=>state.course) 
  
    const [popularCourses, setPopularCourses] = useState([])

   useEffect(() => {
  if (courseData?.courses) {
    setPopularCourses(courseData.courses.slice(0, 6))
  } else {
    setPopularCourses([])
  }
}, [courseData])


  return (
    <div className='reletive flex items-center justify-center flex-col'>
        <h1 className='text-5xl font-semibold text-black mt-8'>Explore Courses</h1>
         <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px] text-gray-800'>
        Discover a variety of courses designed to enhance your skills and knowledge across different domains. 
         </span>

        <div className='w-[100%] flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] mb-[40px]'>
            {popularCourses.map((course, index) => (
  <Card
    key={index}
    thumbnail={course.thumbnail}
    title={course.title}
    category={course.category}
    price={course.price}
    id={course._id}
  />
))}


           </div>
  
    </div>
  )
}

export default CardPage
