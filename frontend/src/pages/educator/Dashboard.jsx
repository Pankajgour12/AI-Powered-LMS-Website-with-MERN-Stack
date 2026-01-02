import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
const Dashboard = () => {
   
  const {userData} = useSelector(state=>state.user)
  const navigate = useNavigate()

  return (
    <div className='flex min-h-screen  text-gray-400 '>

<header className="fixed w-full top-0 z-30 bg-[#0b0f19]/80 backdrop-blur border-b border-white/10 ">
        <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-white/60 hover:text-white transition"
          >
            <FaArrowLeftLong size={18} />
          </button>
          <span className="text-sm uppercase tracking-widest text-white/40">
            Home
          </span>
        </div>
      </header>

 
       <div className='w-full px-6 py-20 bg-black space-y-10'>
            {/* main Section */}
        <section className="space-y-8 max-w-5xl mx-auto ">

        
          <div className="relative  rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-10 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 blur-3xl rounded-full" />

            <div className="relative flex items-center  gap-10">
              {userData?.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  alt="profile"
                  className="w-25 h-25 sm:w-30 sm:h-30 rounded-full object-cover border-3 border-amber-100 shrink-0"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white text-black flex items-center justify-center text-3xl font-semibold shrink-0">
                  {userData?.name?.charAt(0).toUpperCase()}

                </div> )}


              

              <div className="min-w-0   flex flex-col gap-1 ">
                <h1 className='text-xl  sm:text-2xl font-semibold tracking-tight truncate'>Welcome </h1>
                <h1 className="text-xl text-amber-50 sm:text-2xl font-semibold tracking-tight truncate">
                  {userData?.name}
                   👋🏻
                </h1>

                 <h1 className='text-xl  font-bold sm:text-2xl '>
                    Total Earning :0
                </h1>


                

                <div className="mt-2 flex  flex-wrap">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-white/10 border border-white/20 text-white/80">
                    {userData?.description}
                  </span>

                  

                  
                </div>

              

                
              </div>

             

              


              



            </div>
          </div>

        
          

          {/* Action */}
          <div>
            <button
              onClick={() => navigate("/edu-courses")}
              className="inline-flex text-amber-50 items-center justify-center px-8 py-3 rounded-full border border-white/20 hover:border-white/40 transition text-sm"
            >
              Create Courses
            </button>
          </div>
        </section>


          {/* Graph Section */}
          <div>

           

          </div>



       </div>

      
        
      
    </div>
  )
}

export default Dashboard
