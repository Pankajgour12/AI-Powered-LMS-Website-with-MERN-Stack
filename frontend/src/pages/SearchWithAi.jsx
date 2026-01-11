import React, { useState }   from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiMicAiFill } from "react-icons/ri";
import ai from '../assets/ai.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import axios from 'axios';
import { serverUrl } from '../App';


const SearchWithAi = () => {
  
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [recommendations, setRecommendations] = useState([])

   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
   const recognition = new SpeechRecognition();
   if(!recognition)toast.error('Speech recognition not supported ')


   
      

   
const handleSearch = async () => {
  if(!recognition) return;
  recognition.start();
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
    setRecommendations(result.data.course
)


    


  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message)

    
  }



}

        



 



  return (
    <div className="min-h-screen  bg-[#05060b] relative overflow-hidden flex flex-col items-center  px-4 py-16" >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.08),transparent_40%)]" />



          {/* Search bar with AI */}
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




     </div>
  )
}

export default SearchWithAi