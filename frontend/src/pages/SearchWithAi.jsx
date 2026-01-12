import React, { useState }   from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiMicAiFill } from "react-icons/ri";
import ai from '../assets/ai.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import axios from 'axios';
import { serverUrl } from '../App';
 import start from '../assets/start.mp3'

const SearchWithAi = () => {
const startsound = new Audio(start)


  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [recommendations, setRecommendations] = useState([])
  
  const [listening, setListening] = useState(false)



   function speak(message){
    let utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);


   }



   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
   const recognition = new SpeechRecognition();
   if(!recognition)toast.error('Speech recognition not supported ')


   
      

   
const handleSearch = async () => {
  if(!recognition) return;
   setListening(true)
  // recognition.start();
  // toast.info('Listening...')
  
  startsound.currentTime = 0;
  startsound.play();

  
  startsound.onended = () => {
    recognition.start();
  };


  
  recognition.onresult = async (e) => {
    const transcript = e.results[0][0].transcript.trim();
    setInput(transcript);
  await  handleRecommendation(transcript)
    

    
    
  }




}




const handleRecommendation = async (query) =>{
 

  try {
    const result = await axios.post(serverUrl + '/api/course/search',{input:query},{withCredentials:true})

    console.log(result.data.course
);
    setRecommendations(result.data.course)
    setListening(false)
   if(result.data.course.length >0){
    speak('These are the top courses I found for you')
    toast.info('these are the top courses I found for you')
   }
   else{
    speak('No courses found')
   }



    


  } catch (error) {
    setListening(false)

    console.log(error);
    toast.error(error.response.data.message)

    
  }



}

        



 



  return (
    <div className="min-h-screen  bg-[#05060b] relative overflow-hidden flex flex-col items-center  px-4 py-16" >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.08),transparent_40%)]" />



          {/* Search  */}
          <div className='bg-black/40 shadow-xl rounded-3xl p-6 sm:p-8 w-full
          max-w-2xl text-center relative'>
            <FaArrowLeftLong 
            className='text-white w-[22px] h-[22px] cursor-pointer absolute 
            '
            onClick={()=>navigate('/')}
            />
            <h1 className='text-2xl sm:text-2xl font-bold flex items-center justify-center gap-2 text-white mb-4'>
              <img src={ai} alt="ai" className='w-8 h-8 sm:w-10 sm:h-10 ' />
              Search with  <span className='text-emerald-500 '>AI </span>
            </h1>

              <div className='flex items-center rounded-full overflow-hidden shadow-lg bg-white/10 text-white/80 relative w-full '>
                <input type="text" placeholder='Search for courses' className='flex-1 bg-transparent outline-none  text-white/80 px-4 py-2 w-full text-sm sm:text-base sm:w-96 ' 
                onChange={(e)=>setInput(e.target.value)} value={input}
                />
 

               {input && <button className='absolute right-14 sm:right-16 cursor-pointer  rounded-full'><img src={ai} className='w-8 h-8 sm:w-10 sm:h-10 ' alt=""
                onClick={()=>handleRecommendation(input)}
                
                /></button>}
              
                <button className='absolute right-2 w-10 h-10 flex items-center justify-center '
                
               onClick={handleSearch}
                >
                
                    
                    <RiMicAiFill className='w-5 h-5 text-green-400  '
                    
                    />
                </button>
              </div>



            
          </div>


          {recommendations.length > 0 ? (
  <div className="w-full max-w-7xl mt-16 px-3 sm:px-6">
    
   
    <h1 className="text-center text-2xl sm:text-3xl font-semibold tracking-wide text-white mb-10">
      AI Search
      <span className="ml-2 text-emerald-400...">Results</span>
    </h1>

    {/* Courses Found */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendations.map((course, index) => (
        <div
          key={course._id || index}
          onClick={() => navigate(`/viewcourse/${course._id}`)}
          className="group relative rounded-2xl overflow-hidden cursor-pointer
                     bg-[#0b0f1a] border border-white/10
                     hover:border-indigo-500/40
                     hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)]
                     transition-all duration-300"
        >
         
          <div className="relative h-44 overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover "
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          
          <div className="p-5">
            <h2 className="text-lg sm:text-xl font-semibold text-white leading-tight">
              {course.title}
            </h2>

            <p className="mt-2 text-sm text-gray-400 uppercase tracking-wide">
              {course.category}
            </p>
          </div>

          
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
            <div className="absolute inset-0 bg-indigo-500/5" />
          </div>
        </div>
      ))}
    </div>
  </div>
) : listening ? (
  <h1 className="text-center text-xl sm:text-2xl mt-14 text-gray-400">
    Listening…
  </h1>
) : (
  <h1 className="text-center text-xl sm:text-2xl mt-14 text-gray-500">
    No Courses Found
  </h1>
)}


         

     


     </div>
  )
}

export default SearchWithAi