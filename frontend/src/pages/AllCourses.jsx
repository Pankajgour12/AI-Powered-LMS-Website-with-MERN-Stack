import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import ai  from '../assets/ai.png'
import { useSelector } from 'react-redux'
import Card from '../component/Card'
const AllCourses = () => {

  const navigate = useNavigate()
  const {courseData} = useSelector(state=>state.course)
  

  const [category, setCategory] = useState([])
  const [filterCourse, setFilterCourse] = useState([])
  const [isSidebarVisible, setIsSidebarVisible] = useState()



  
  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(c => c !== e.target.value))
    }else{
      setCategory(prev => [...prev,e.target.value])
    }
  }
 

 const applyFilter = () => {
  let courseCopy = courseData?.courses?.slice() || []

  if (category.length > 0) {
    courseCopy = courseCopy.filter(c =>
      category.includes(c.category)
    )
  }

  setFilterCourse(courseCopy)
}


 useEffect(() => {
  setFilterCourse(courseData?.courses || [])
}, [courseData])

  useEffect(() => {
  applyFilter()
}, [category, courseData])

  

  return (
    <div className='flex min-h-screen  bg-black/20'>
     <Navbar/>
    
     <button className='fixed top-20 left-4 z-50  bg-white text-black px-3 py-1 rounded-md md:hidden border-2
     border-black'
     onClick={()=>setIsSidebarVisible(prev=>!prev)}
     >
      {isSidebarVisible ? 'Hide' : 'Show'} Filters

     </button>


     {/* sidebar */}



     <aside
      className={`w-[260px]  h-screen overflow-y-auto pt-30  bg-black/50  backdrop-blur-md top-0 left-0  p-6 border-r border-gray-200
      shadow-md fixed transition-transform duration-300 z-5 
      ${isSidebarVisible ? "translate-x-0" : "-translate-x-full" }
      md:block md:translate-x-0

      `}
     >
      <h2 className="text-xl font-bold flex items-center justify-center gap-2 mb-6 text-white md:text-black"
      >
        <FaArrowLeftLong className=' text-gray-800'
        onClick={()=>navigate('/')}
        />
        Course Categories</h2>

        <form action="" onSubmit={(e)=>e.preventDefault()}
        className='space-y-4 text-sm bg-gray-600 border-white/40 text-black/70 border p-[20px] rounded-2xl'>

          <button className='px-[10px] py-[10px] bg-black/50  text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer'>
            Search With Ai
            <img src={ai} alt="ai" className='w-[20px] h-[20px] rounded-full'/>
          </button>

          <label htmlFor=""
          className='flex items-center gap-3 cursor-pointer hover:text-white transition'
          >

            <input type="checkbox"
            className='accent-red-600 w-4 h-4 rounded-full '
             value={'Web Development'} onChange={toggleCategory}
             /> Web Development
          </label>

          <label htmlFor=""
          className='flex items-center gap-3 cursor-pointer hover:text-white transition'
          >

            <input type="checkbox"
            className='accent-red-600 w-4 h-4 rounded-full '
            value={'App Development'} onChange={toggleCategory}
            /> App Development
          </label>

          <label htmlFor=""
          className='flex items-center gap-3 cursor-pointer hover:text-white transition'
          >

            <input type="checkbox"
            className='accent-red-600 w-4 h-4 rounded-full '
            value={'UI/UX'} onChange={toggleCategory}
            /> UI/UX Design
          </label>

          <label htmlFor=""
          className='flex items-center gap-3 cursor-pointer hover:text-white transition'
          >

            <input type="checkbox"
            className='accent-red-600 w-4 h-4 rounded-full '
            value={'Ethical Hacking'} onChange={toggleCategory}
             
             /> Ethical Hacking
          </label>

          <label htmlFor=""
          className='flex items-center gap-3 cursor-pointer hover:text-white transition'
          >

            <input type="checkbox"
            className='accent-red-600 w-4 h-4 rounded-full '
            value={'AI/ML'} onChange={toggleCategory}
            
            /> AI / ML
          </label>

          <label htmlFor=""
          className='flex items-center gap-3 cursor-pointer hover:text-white transition'
          >

            <input type="checkbox"
            className='accent-red-600 w-4 h-4 rounded-full '
            value={'Other'} onChange={toggleCategory}
             
             />Others Courses
          </label>

         





        </form>

     </aside>

     <main className='w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-around
     md:justify-start flex-wrap gap-6 px-[10px] '>
      {
        filterCourse?.map((course,index)=>(
          
             <Card
             
    key={index}
    thumbnail={course.thumbnail}
    title={course.title}
    category={course.category}
    price={course.price}
    id={course._id}
  />
         
        ))

            



        }


     </main>




      
    </div>
  )
}

export default AllCourses
