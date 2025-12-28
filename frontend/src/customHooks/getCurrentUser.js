import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const useCurrentUser = () => {
   
    const dispatch = useDispatch()

 
   useEffect(()=>{
    const fetchUser = async()=>{
      try {
        const result = await axios.get(serverUrl+'/api/user/getcurrentuser', 
            {withCredentials:true})
        console.log("Current User:", result.data);

        dispatch(setUserData(result.data))
    
  } catch (error) {
    console.log("Get Current User:",error.message);
            dispatch(setUserData(null))
  }




    }
    fetchUser();
   },[dispatch])
}

export default useCurrentUser;
