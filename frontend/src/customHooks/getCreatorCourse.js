import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setCreatorCourseData } from '../redux/courseSlice'

const getCreatorCourse = () => {
  const dispatch = useDispatch()
  const {userData} = useSelector((state)=>state.user)

  return (


    useEffect(()=>{
        const creatorCourse = async () =>{
            try {
                 const result = await axios.get(serverUrl + '/api/course/getcreator',{withCredentials:true})
             

             dispatch(setCreatorCourseData(result.data))


                
            } catch (error) {
                console.log(error);
                
            }




        }
        creatorCourse();




    },[userData, dispatch])
    
  )
}

export default getCreatorCourse
