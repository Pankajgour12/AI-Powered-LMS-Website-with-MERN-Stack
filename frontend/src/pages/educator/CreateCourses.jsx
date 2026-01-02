import axios from 'axios';
import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";

 import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const CreateCourses = () => {

 const navigate = useNavigate()

 const [title, setTitle] = useState()
 const [category, setCateory] = useState()
 const [loading, setLoading] = useState()

 const handleCreateCourse = async () =>{
    setLoading(true)
    try {
        const result = await axios.post(serverUrl + '/api/course/create',
            {title, category},{withCredentials:true})
            console.log(result)
            console.log(result.data)

            navigate('/courses')
            setLoading(false)
            toast.success("Course Created")
        
    } catch (error) {
        console.log(error)
         setLoading(false)
        toast.error(error.response.data.message)
        
    }




 }




  return (
    <div className='min-h-screen flex items-center justify-center
    bg-gray-950 px-4 py-10 text-amber-50 '>

        <div className='max-w-xl w-[600px] bg-gray-800 mx-auto p-6 shadow-md rounded-md mt-10 relative'> 
            
            <FaArrowLeftLong size={24} 
            onClick={()=>navigate('/edu-courses')}
            className='top-[8%] absolute left-[5%] cursor-pointer '/>

            <h2 className='text-xl font-semibold mb-6 text-center'> Create Course</h2>

            <form className='space-y-5'
            onSubmit={(e)=>e.preventDefault()}
            >
             <div>
                <label htmlFor="title" 
                className='block text-sm font-medium text-blue-100 mb-2'>Course Title</label>
                <input type="text" id='title' placeholder='Enter Course Title'
                className='w-full border border-gray-400 rounded-md px-4 py-2 
                focus:outline-none focus:ring-1 focus:ring-[white]'
                onChange={(e)=>setTitle(e.target.value)} value={title}
                />
             </div>
             <div>
                 <label htmlFor="cate" 
                className='block text-sm font-medium text-blue-100 mb-2'>Course Category</label>
                <select  id="cate" 
                className='w-full border border-gray-400 rounded-md px-4 py-2 
                focus:outline-none focus:ring-1 focus:ring-[white] bg-gray-800'
                onChange={(e)=>setCateory(e.target.value)}
               
                >
                    <option value="">Select Category</option>
                    <option value="Web Devlopment">Web Devlopment</option>
                    <option value="UI/UX">UI/UX </option>
                    <option value="App Devlopment">App Devlopment </option>
                    <option value="Ethical Hacking ">Ethical Hacking</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Other ">Other Options</option>



                </select>
             </div>
             <button className='w-full bg-black text-white py-2 px-4 rounded-md active:bg-gray-600 transition'
              disabled={loading}
              onClick={handleCreateCourse}

             >
                {loading? <ClipLoader size={28} color='white'/>: "Create" }
             </button>

            </form>

        </div>
       

    </div>
    
  )
}

export default CreateCourses
