import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'

const ForgetPassword = () => {
const [step,setStep] = useState(1)
const navigate = useNavigate()

const [email, setEmail] = useState('')
const [otp, setOtp]    = useState('')


const [loading,setLoading] = useState(false)





const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [showConfirm, setShowConfirm] = useState(false);

const isMatch =
  newPassword.length >= 6 &&
  confirmPassword.length >= 6 &&
  newPassword === confirmPassword;


  //for step 1

  const sendOtp = async () =>{
    setLoading(true)

    try {
  const result = await axios.post(serverUrl + "/api/auth/sendotp" , {email},{withCredentials:true})
 console.log(result.data)
 setLoading(false)
 setStep(2)
 toast.success(result.data.message)
      
    } catch (error) {
      console.log(error)  
      toast.error(error.response.data.message)
      setLoading(false)
    }


  }


  //for step 2
const verifyOTP = async ()=>{
setLoading(true)

try {
      const result = await axios.post(serverUrl + "/api/auth/verifyotp",{email, otp}, {withCredentials:true})
      console.log(result.data)
      setLoading(false)
      setStep(3)
      toast.success(result.data.message)
  
} catch (error) {
     console.log(error)
     toast.error(error.respose.data.message)
     setLoading(false)

}


}


// for step 3 

const resetpassword = async () =>{
  setLoading(true)

  try {



    const result = await axios.post(serverUrl + "/api/auth/resetpassword",{email , password:newPassword},{withCredentials:true})
       console.log(result.data)
       setLoading(false)
       navigate('/login')
        toast.success(result.data.message)


    
  } catch (error) {
    console.log(error)

    toast.error(error.response.data.message)
    setLoading(false)


    
  }
}




  



return (
<div className="
  min-h-screen flex items-center justify-center px-4
  bg-gradient-to-br
  from-[#91e8be] via-[#fdf2f8] to-[#eff6ff]
  relative overflow-hidden
">



{/* STEP 1 */}
{step === 1 && (
  <div className="w-full max-w-md bg-white rounded-xl shadow-lg px-7 py-8 animate-slide-up">
    
    <div className="mb-6 text-center">
      <h2 className="text-xl font-semibold text-gray-800">
        Forgot your password?
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Enter your email to receive a verification code
      </p>
    </div>

    <form className="space-y-5" onSubmit={(e)=>e.preventDefault()} >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <input
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
          onChange={(e)=>setEmail(e.target.value)} value={email}

        />
      </div>

      <button className="w-full rounded-md bg-rose-600 text-white py-2.5 text-sm font-medium hover:bg-rose-700 transition cursor-pointer"
      disabled={loading}
      onClick={sendOtp}
      >
        { loading? <ClipLoader size={30} color='white'/> : "Send OTP" }
      </button>
    </form>

    <div
      onClick={() => navigate("/login")}
      className="mt-6 text-sm text-center text-gray-600 hover:text-rose-600 cursor-pointer"
    >
      ← Back to login
    </div>
  </div>
)}

{/* STEP 2 */}
{step === 2 && (
  <div className="w-full max-w-md bg-white rounded-xl shadow-lg px-7 py-8 animate-slide-up">
    
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Verify OTP
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Enter the 4-digit code sent to your email
      </p>
    </div>

    <form className="space-y-5" onSubmit={(e)=>e.preventDefault()}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          OTP Code
        </label>
        <input
          type="number"
          required
          maxLength={4}
          placeholder="••••"
          className="tracking-widest text-center w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
          onChange={(e)=>setOtp(e.target.value)} value={otp}

        />
      </div>

      <button className="w-full rounded-md bg-rose-600 text-white py-2.5 text-sm font-medium hover:bg-rose-700 transition"
      disabled={loading}
      onClick={verifyOTP}
      >
       { loading? <ClipLoader size={30} color='red'/> :"Verify OTP"}
      </button>
    </form>

    <div
      onClick={() => navigate("/login")}
      className="mt-6 text-sm text-center text-gray-600 hover:text-rose-600 cursor-pointer"
    >
      ← Back to login
    </div>
  </div>
)}



{/* STEP 3 */}
{step === 3 && (
  <div className="w-full max-w-md bg-white rounded-xl shadow-lg px-7 py-8 animate-slide-up">
    
    {/* Header */}
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-rose-600">
        Reset password
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Enter and confirm your new password
      </p>
    </div>

    <form className="space-y-4" 
    onSubmit={(e)=>e.preventDefault()}>
      
      {/* New password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New password
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Minimum 6 characters"
          className="
            w-full rounded-md border border-gray-300
            px-4 py-2.5 text-sm
            focus:outline-none focus:ring-2 focus:ring-rose-400
          "
        />
      </div>

      {/* Confirm password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm password
        </label>

        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            className="
              w-full rounded-md border border-gray-300
              px-4 py-2.5 pr-10 text-sm
              focus:outline-none focus:ring-2 focus:ring-rose-400
            "
          />

          {/* Eye toggle */}
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              text-gray-500 hover:text-rose-600 transition
            "
            title="Show / Hide password"
          >
            👁
          </button>
        </div>

        {/* Error message */}
        {confirmPassword.length > 0 && newPassword !== confirmPassword && (
          <p className="text-xs text-red-500 mt-1">
            Passwords do not match
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        disabled={!isMatch}
        className="
          w-full rounded-md py-2.5 text-sm font-medium
          text-white transition
          bg-rose-600 hover:bg-rose-700
          disabled:opacity-50 disabled:cursor-not-allowed
        "
       
        onClick={resetpassword}
      >
        {loading? <ClipLoader size={30} color='white'/>  : "Save new password"}
      </button>
    </form>

    {/* Back */}
    <div
      onClick={() => navigate("/login")}
      className="
        mt-6 text-sm text-center
        text-gray-600 hover:text-rose-600 cursor-pointer
      "
    >
      ← Back to login
    </div>
  </div>
)}








    </div>
    
  
  )


  

}

export default ForgetPassword
