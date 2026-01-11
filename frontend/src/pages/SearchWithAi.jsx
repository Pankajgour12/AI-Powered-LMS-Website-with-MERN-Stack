import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiMicAiFill } from "react-icons/ri";
import ai from '../assets/ai.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 


const SearchWithAi = () => {
  
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [recommendation, setRecommendation] = useState([])

 
          const recognitionRef = useRef(null);

           

           useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setInput(text);
    };

    recognition.onerror = (e) => {
      console.error("Speech error:", e.error);
    };

    recognitionRef.current = recognition;
  }, []);





 const handleSearch = () => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.start();
      toast.info("Listening...");
    } catch(error) {
      console.error("Speech recognition error:", error);
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
 

                <button className='absolute right-14 sm:right-16 cursor-pointer  rounded-full'><img src={ai} className='w-8 h-8 sm:w-10 sm:h-10 ' alt="" /></button>
              
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
