import React from 'react'
import { Navigate, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCurrentUser from './customHooks/getCurrentUser.js'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import ForgetPassword from './pages/ForgetPassword'
import EditProfile from './pages/EditProfile.jsx'



export const serverUrl ='http://localhost:8000'

const App = () => {
 

 useCurrentUser(); 
 


const { userData } = useSelector(state => state.user);






  
  return (

    <>
    <ToastContainer />
   <Routes>

  <Route path='/' element={<Home />} />


    <Route
  path="/signup"
  element={userData ? <Navigate to="/" replace /> : <SignUp />}
  />
 
  <Route path='/login' element={<Login />} />



    <Route path='/profile' element={ userData ?  <Profile /> :
    <Navigate to={'/signup'} />
     } />

      <Route path="/forgot" element={userData ? <ForgetPassword />:
      <Navigate to={'/signup'} />
    } />

     <Route path="/editprofile" element={userData ? <EditProfile />:
      <Navigate to={'/signup'} />
    } />

     

   </Routes>

     
    </>
  )
}

export default App
