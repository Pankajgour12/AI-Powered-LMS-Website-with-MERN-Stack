import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Bar, BarChart, CartesianGrid, Cell, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';



const Dashboard = () => {
   
  const {userData} = useSelector(state=>state.user)
  const {creatorCourseData} = useSelector(state=>state.course)
  const navigate = useNavigate()

  const CourseProgressData  = creatorCourseData?.courses?.map((course)=>({
    name: course.title?.slice(0,10) + '...',
    lectures:course.lectures?.length || 0


  })) || [];

  const EnrollData  = creatorCourseData?.courses?.map((course)=>({
    name: course.title?.slice(0,10) + '...',
    enrolledStudents:course.enrolledStudents?.length || 0


  })) || [];


  const maxLectures = Math.max(...CourseProgressData.map(d => d.lectures));
  const maxEnroll = Math.max(...EnrollData.map(d => d.enrolledStudents));




const DarkTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

 
  const uniquePayload = [];
  const seenKeys = new Set();

  payload.forEach((item) => {
    if (!seenKeys.has(item.dataKey)) {
      seenKeys.add(item.dataKey);
      uniquePayload.push(item);
    }
  });

  return (
    <div
      className="
        rounded-xl px-4 py-3
        bg-[#0b0d16]/90
        backdrop-blur-md
        border border-white/10
        shadow-[0_10px_40px_rgba(0,0,0,0.6)]
      "
    >
      <p className="text-xs uppercase tracking-widest text-white/50 mb-2">
        {label}
      </p>

      {uniquePayload.map((item, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: item.color }}
          />
          <span className="text-white/70 capitalize">
            {item.name}
          </span>
          <span className="text-white font-semibold ml-auto">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};












  
 
  
 

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
          

         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

  {/* COURSE PROGRESS */}
  <div className="relative rounded-3xl bg-[#05060b] border border-white/10 p-6 overflow-hidden">


    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.22),transparent_65%)]" />

    <h2 className="relative text-xs uppercase tracking-[0.4em] text-white/50 mb-6">
      Course Activity • Lectures
    </h2>

    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={CourseProgressData}>
        <Line
  type="monotone"
  dataKey="lectures"
  stroke="#34d399"
  strokeWidth={2.2}
  dot={{
    r: 4,
    stroke: "#34d399",
    strokeWidth: 2,
    fill: "#05060b",
  }}
  activeDot={{
    r: 7,
    fill: "#22c55e",
    stroke: "#16a34a",
    strokeWidth: 2,
  }}
  animationDuration={1800}
/>

     

        
        <defs>
          <linearGradient id="lectureGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />

        <XAxis
          dataKey="name"
          tick={{ fill: "#6b7280", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tick={{ fill: "#6b7280", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
  content={<DarkTooltip />}
  cursor={{
    fill: "rgba(255,255,255,0.04)",
  }}
/>


        

        <Bar
          dataKey="lectures"
          radius={[8, 8, 0, 0]}
          barSize={20}
          animationDuration={1400}
          animationEasing="ease-out"
        >
          {CourseProgressData.map((entry, index) => (
            <Cell
              key={index}
              fill={
                entry.lectures === maxLectures
                  ? "#22c55e"   
                  : "url(#lectureGlow)"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* ENROLLMENT FLOW */}
  <div className="relative rounded-3xl bg-[#05060b] border border-white/10 p-6 overflow-hidden">

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.22),transparent_65%)]" />

    <h2 className="relative text-xs uppercase tracking-[0.4em] text-white/50 mb-6">
      Student Flow • Enrollment
    </h2>

    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={EnrollData}>
           <Line
  type="monotone"
  dataKey="enrolledStudents"
  stroke="#a78bfa"
  strokeWidth={2.2}
  dot={{
    r: 4,
    stroke: "#a78bfa",
    strokeWidth: 2,
    fill: "#05060b",
  }}
  activeDot={{
    r: 7,
    fill: "#a855f7",
    stroke: "#7c3aed",
    strokeWidth: 2,
  }}
  animationDuration={2000}
/>
        <defs>
          <linearGradient id="enrollGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>

        <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />

        <XAxis
          dataKey="name"
          tick={{ fill: "#6b7280", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tick={{ fill: "#6b7280", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
  <Tooltip
  content={<DarkTooltip />}
  cursor={{
    fill: "rgba(255,255,255,0.04)",
  }}
/>

        {/* <Tooltip content={<ProTooltip />} /> */}

        <Bar
          dataKey="enrolledStudents"
          radius={[8, 8, 0, 0]}
          barSize={20}
          animationDuration={1600}
          animationEasing="ease-out"
        >
          {EnrollData.map((entry, index) => (
            <Cell
              key={index}
              fill={
                entry.enrolledStudents === maxEnroll
                  ? "#a855f7"
                  : "url(#enrollGlow)"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>

</div>



          





       </div>

       

      
        
      
    </div>
  )

}
export default Dashboard
