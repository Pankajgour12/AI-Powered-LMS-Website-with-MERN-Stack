import React, { useState } from 'react'
 import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import axios from 'axios'
import { serverUrl } from '../App'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/firebase'
const Login = () => {
  const navigate = useNavigate()


    const [email,setEmail] = useState('')
     const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)

       const dispatch = useDispatch()
    
    

    const handleLogin = async () => {
      setLoading(true)

      try {
        const result = await axios.post(serverUrl + '/api/auth/login',{email,password},{withCredentials:true} )

          dispatch(setUserData(result.data.user))
       

         setLoading(false)
         toast.success('Login Successfully ')
         console.log("DISPATCH USER =>", result.data.user);

         navigate("/", { replace: true });
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
        setLoading(false)
        
      }

    }

      const googleLogin = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    const user = response.user;

    const result = await axios.post(
      serverUrl + "/api/auth/googleauth",
      {
        name: user.displayName,
        email: user.email,
       
      },
      { withCredentials: true }
    );

    dispatch(setUserData(result.data.user));
    toast.success("Google login successful ✅");
    navigate("/");

  } catch (error) {
    console.error(error);
    toast.error(
      error?.response?.data?.message || "Google login failed"
    );
  }
};

      
   

    
  return (
    
    <div className='bg-gray-900 w-[100vw] h-[100vh] flex items-center justify-center' >
          <form className='w-[90%] md:w-200 h-150 bg-amber-50 shadow-xl rounded-2xl flex'
          onSubmit={(e)=>e.preventDefault()}
          >
       
    
         {/* left div */}

         <div className="md:w-[50%] w-full h-full flex flex-col items-center justify-center gap-6 rounded-l-2xl">

  
  <div className="text-center">
    <h1 className="font-semibold text-rose-800 text-3xl">
      Welcome back 👋🏻
    </h1>
    <h2 className="text-gray-600 pt-1 text-sm">
      Login to your LearnFlow account
    </h2>
  </div>

  
  <div className="flex flex-col gap-1 w-[80%] items-start">
    <label htmlFor="email" className="font-medium text-sm text-gray-700">
      Email
    </label>
    <input
      type="email"
      id="email"
      placeholder="you@example.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          document.getElementById("password")?.focus();
        }
      }}
      className="w-full p-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
    />
  </div>

  
  <div className="flex flex-col gap-1 w-[80%] items-start">
    <label htmlFor="password" className="font-medium text-sm text-gray-700">
      Password
    </label>

    <div className="relative w-full">
      <input
        type="password"
        id="password"
        placeholder="Minimum 6 characters"
        value={password}
        minLength={6}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById("login-btn")?.focus();
          }
        }}
        className="w-full p-2.5 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
      />

     
      <button
        type="button"
        onClick={() => {
          const input = document.getElementById("password");
          input.type =
            input.type === "password" ? "text" : "password";
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-rose-600 transition"
      >
        👁
      </button>
    </div>

    <div className="w-full text-right">
      <span
        onClick={() => navigate('/forgot')}
        className="text-xs text-rose-600 cursor-pointer hover:underline"
      >
        Forgot your password?
      </span>
    </div>
  </div>

  
  <button
    id="login-btn"
    type="button"
    disabled={loading || !email || !password}
    onClick={handleLogin}
    className="
      w-[80%] p-2.5 rounded-md
      bg-rose-600 text-white font-medium
      hover:bg-rose-700 transition
      cursor-pointer

      disabled:opacity-60 disabled:cursor-not-allowed
    "
  >
    {loading ? <ClipLoader size={26} color="white" /> : "Login"}
  </button>

  
  <div className="w-[80%] flex items-center gap-3">
    <div className="flex-1 h-px bg-gray-300" />
    <span className="text-xs text-gray-500">OR</span>
    <div className="flex-1 h-px bg-gray-300" />
  </div>

  
  <button
    type="button"
    className="w-[80%] flex items-center justify-center gap-3 p-2.5 rounded-md border border-gray-300 hover:bg-gray-100 transition"
    onClick={googleLogin}
  >
    <img
      src="https://www.svgrepo.com/show/475656/google-color.svg"
      className="w-5 h-5"
      alt="Google"
    />
    <span className="font-medium text-sm">
      Continue with Google
    </span>
  </button>

 
  <p className="text-sm text-gray-600">
    Don’t have an account?{" "}
    <span
      onClick={() => navigate("/signup")}
      className="text-rose-600 font-medium cursor-pointer hover:underline"
    >
      Sign up
    </span>
  </p>
</div>





{/* right div */}
<div
  className="
    w-[50%] h-full hidden md:flex
    relative overflow-hidden
    rounded-r-2xl
    flex-col items-center justify-center
    text-white
    bg-gradient-to-br
    from-[#fbc2eb] via-[#a6c1ee] to-[#c2e9fb]
  "
>
  <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />

  <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/40 rounded-full blur-[100px]" />
  <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-white/30 rounded-full blur-[120px]" />

  <div className="relative z-10 flex flex-col items-center text-center gap-5 px-10">
    <img
      src={logo}
      alt="logo"
      className="w-28 drop-shadow-lg"
    />

    <h1 className="text-3xl font-bold tracking-tight text-gray-800">
      LearnFlow
    </h1>

    <p className="text-sm text-gray-700 leading-relaxed max-w-xs">
      Learn with clarity.  
      Grow with confidence.  
      A calm space for focused learning.
    </p>

    <span className="mt-2 text-xs text-gray-600 bg-white/60 px-4 py-1 rounded-full">
      AI-Powered Learning Platform
    </span>
  </div>
</div>




    
    
    
    
    
    
          </form>
    
    
          
        </div>
    
  )
}

export default Login
