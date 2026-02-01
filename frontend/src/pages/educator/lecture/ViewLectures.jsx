import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import { serverUrl } from '../../../App'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { FaPlayCircle } from 'react-icons/fa'



function ViewLectures(){
 const {courseId} = useParams()
 const {courseData} = useSelector(state => state.course)

 const {userData} = useSelector(state => state.user)
 const selectedCourse = courseData?.courses?.find(
  (course) => course._id === courseId
)

 const [creatorData, setCreatorData] = useState(null)
  const [selectedLecture, setSelectedLecture] = useState(selectedCourse?.lectures?.[0] || null)
 

 
 const navigate = useNavigate()


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

  return (
    <div className="min-h-screen bg-[#05060b] text-white">

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 
      lg:grid-cols-[1.5fr_1fr] gap-8">

<div className="space-y-6">

  {/* HEADER */}
  <div className="flex items-center gap-4">
    <FaArrowLeftLong
      onClick={() => navigate('/')}
      className="cursor-pointer text-white/70 hover:text-white"
    />

    <div>
      <h1 className="text-xl sm:text-2xl font-semibold">
        {selectedCourse?.title}
      </h1>
      <p className="text-xs tracking-widest uppercase text-white/40">
        {selectedCourse?.category} · {selectedCourse?.level}
      </p>
    </div>
  </div>

  {/* VIDEO section */}
  <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10">

    <div className="aspect-video flex items-center justify-center">
      {selectedLecture?.videoUrl ? (
        <video
          src={selectedLecture.videoUrl}
          controls
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <FaPlayCircle className="text-6xl text-white/70" />
          <p className="text-xs tracking-[0.4em] uppercase text-white/50">
            Select a lecture
          </p>
        </div>
      )}
    </div>

    <div className="px-4 py-3 border-t border-white/10">
      <p className="text-xs uppercase tracking-widest text-white/40">
        Now Playing
      </p>
      <p className="text-sm font-medium">
        {selectedLecture?.lectureTitle || "Idle"}
      </p>
    </div>
  </div>

</div>

<div className="space-y-6">

  {/* LECTURES */}
  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

    <h2 className="text-sm tracking-[0.4em] uppercase text-white/40 mb-4">
      Lectures
    </h2>

    <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
      {selectedCourse?.lectures?.map((lecture, index) => {
        const active = selectedLecture?._id === lecture._id

        return (
          <button
            key={lecture._id}
            onClick={() => setSelectedLecture(lecture)}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
              transition
              ${
                active
                  ? "bg-white/20 border border-white/30"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              }
            `}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                active ? "bg-emerald-400" : "bg-white/40"
              }`}
            />

            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-white/40">
                Lecture {index + 1}
              </p>
              <p className="text-sm font-medium">
                {lecture.lectureTitle}
              </p>
            </div>

            <FaPlayCircle
              className={`text-lg ${
                active ? "text-emerald-400" : "text-white/40"
              }`}
            />
          </button>
        )
      })}
    </div>
  </div>

  {/* Creator Info */}

  <div className='bg-white/5 border border-white/10 rounded-2xl'>
    <h1 className='text-xl text-center mt-3 text-white/80 hover:underline'>Educator</h1>
  <div className="  p-4 flex items-center gap-4">
  
    <img
      src={creatorData?.photoUrl}
      className="w-20 h-20 rounded-full object-cover border border-white/20"
    />
    <div>
      
      <h2 className=" text-lg font-semibold">{creatorData?.name}</h2>
      <p className="text-xs text-white/60">{creatorData?.description}</p>
      <p className="text-xs text-white/40">{creatorData?.email}</p>
    </div>
  </div></div>

</div>

</div>
</div>

 
);

}

export default ViewLectures
