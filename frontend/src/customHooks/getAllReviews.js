import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setReviewData } from '../redux/reviewSlice.js'



const getAllReviews = () => {
    const dispatch = useDispatch()
       useEffect(()=>{
        const allReviews = async ()=>{
            try {
                const result = await axios.get(serverUrl + '/api/review/getreviews',{withCredentials:true})
                console.log(result.data);
                dispatch(setReviewData(result.data))
            } catch (error) {
                console.log(error);
            }
        }
        allReviews();

    },[])
  
}

export default getAllReviews
