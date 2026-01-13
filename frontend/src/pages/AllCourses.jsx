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
  <div className="min-h-screen bg-[#05060b] text-white">
    <Navbar />

    
    <div className="pt-[60px]">

      {/* HOME */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-[80px] left-6 md:left-[22%] z-40 flex items-center gap-2 text-sm text-green-400 hover:text-white"
      >
        <FaArrowLeftLong size={14} />
        Home
      </button>

      {/* MOBILE FILTER */}
      <button
        onClick={() => setIsSidebarVisible(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 px-5 py-3 
        rounded-full bg-white text-black font-medium shadow-xl"
      >
        Filters
      </button>

      {/* MOBILE  SIDEBAR */}
      {isSidebarVisible && (
        <div className="fixed inset-0 z-50 md:hidden">
          
          
          <div
            onClick={() => setIsSidebarVisible(false)}
            className="absolute inset-0 bg-black/60"
          />

          {/* SIDEBAR */}
          <aside
            className="
              absolute left-0 top-0
              h-full w-[280px]
              bg-[#0b0f19]
              border-r border-white/10
              px-6 py-6
              overflow-y-auto
            "
          >
          
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setIsSidebarVisible(false)}
                className="text-sm text-white/60 hover:text-white"
              >
                Close
              </button>
            </div>

            <button
              onClick={() => {
                navigate("/search");
                setIsSidebarVisible(false);
              }}
              className="w-full mb-8 flex items-center justify-center gap-2 py-3
              rounded-xl bg-gradient-to-r from-indigo-500/20 to-emerald-500/20
              border border-white/10"
            >
              <img src={ai} className="w-5 h-5" />
              <span className="text-sm font-medium">Search with AI</span>
            </button>

            <div className="space-y-3 text-sm">
              {[
                "Web Development",
                "App Development",
                "UI/UX",
                "Ethical Hacking",
                "AI/ML",
                "Other",
              ].map(item => (
                <label
                  key={item}
                  className="flex items-center gap-3 text-white/70 hover:text-white cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={item}
                    onChange={toggleCategory}
                    className="accent-indigo-500"
                  />
                  {item}
                </label>
              ))}
            </div>
          </aside>
        </div>
      )}

      {/* DESKTOP LAYOUT */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr]">

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden md:block sticky top-[72px]
          h-[calc(100vh-72px)] w-[280px]
          bg-[#0b0f19] border-r border-white/10 px-6 py-8"
        >
          <button
            onClick={() => navigate("/search")}
            className="w-full mb-8 flex items-center justify-center gap-2 py-3
            rounded-xl bg-gradient-to-r from-indigo-500/20 to-emerald-500/20
            border border-white/10"
          >
            <img src={ai} className="w-5 h-5" />
            <span className="text-sm font-medium">Search with AI</span>
          </button>

          <div className="space-y-3 text-sm">
            {[
              "Web Development",
              "App Development",
              "UI/UX",
              "Ethical Hacking",
              "AI/ML",
              "Other",
            ].map(item => (
              <label key={item} className="flex items-center gap-3 text-white/70">
                <input
                  type="checkbox"
                  value={item}
                  onChange={toggleCategory}
                  className="accent-indigo-500"
                />
                {item}
              </label>
            ))}
          </div>
        </aside>

        {/* CONTENT */}
        <main className="px-6 md:px-10 py-20">
          <div className="max-w-7xl mx-auto">

            <div className="mb-12">
              <p className="text-xs tracking-[0.35em] text-white/40">
                LEARNFLOW CATALOG
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Choose a skill worth your time.
              </h2>
            </div>

            <div className="flex flex-wrap gap-4">
              {filterCourse?.map((course, index) => (
                <Card
                  key={index}
                  thumbnail={course.thumbnail}
                  title={course.title}
                  category={course.category}
                  price={course.price}
                  id={course._id}
                  reviews={course.reviews}
                />
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  </div>
);



  
}

export default AllCourses
