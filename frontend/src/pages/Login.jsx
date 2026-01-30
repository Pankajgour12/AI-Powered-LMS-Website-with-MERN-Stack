import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import axios from 'axios'
import { serverUrl } from '../App'
import { toast } from "sonner";
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/firebase'
import funGif from "../assets/gif.gif";
import { FaArrowLeftLong } from 'react-icons/fa6'

const Login = () => {
  const navigate = useNavigate()


    const [email,setEmail] = useState('')
     const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)

       const dispatch = useDispatch()
    
    

    const handleLogin = async () => {
      if (loading) return;

  if (!email || !password) {
    toast.error("Email and password required");
    return;
  }
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
        toast.error(error?.response?.data?.message || "Login failed");

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
  <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-[#0b0f1a]">


          <button
                         onClick={() => navigate("/")}
                         className="text-green-400 hover:text-white
                         absolute top-8 left-6 flex items-center gap-2
                         transition"
                       >
                         <FaArrowLeftLong size={22} />
                         
                       </button>
    <form
      className="
        w-[90%] md:w-[950px] h-[540px]
        bg-[#0f1424]/90 backdrop-blur-xl
        shadow-[0_30px_90px_rgba(0,0,0,0.75)]
        rounded-3xl flex overflow-hidden
        border border-white/10
      "
      onSubmit={(e) => e.preventDefault()}
    >

      {/* LEFT — LOGIN */}
      <div className="md:w-[50%] w-full h-full flex flex-col items-center justify-center gap-6">
             

             
                      
           
        <div className="text-center">
          
          <h1 className="font-semibold text-white text-3xl">
           
            Welcome back 👋
          </h1>
          <p className="text-white/50 pt-1 text-sm">
            Login to your LearnFlow account
          </p>
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-1 w-[80%]">
          <label htmlFor="email" className="text-sm text-white/60">
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
            className="
              w-full px-4 py-3 rounded-lg
              bg-[#0b0f1a]
              border border-white/10
              text-white placeholder:text-white/30
              focus:outline-none
              focus:border-indigo-400/60
              transition
            "
          />
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col gap-1 w-[80%]">
          <label htmlFor="password" className="text-sm text-white/60">
            Password
          </label>

          <div className="relative">
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
              className="
                w-full px-4 py-3 pr-10 rounded-lg
                bg-[#0b0f1a]
                border border-white/10
                text-white placeholder:text-white/30
                focus:outline-none
                focus:border-indigo-400/60
                transition
              "
            />

            <button
              type="button"
              onClick={() => {
                const input = document.getElementById("password");
                input.type =
                  input.type === "password" ? "text" : "password";
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-indigo-400 transition"
            >
              👁
            </button>
          </div>

          <div className="text-right">
            <span
              onClick={() => navigate("/forgot")}
              className="text-xs text-indigo-400 cursor-pointer hover:underline"
            >
              Forgot your password?
            </span>
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <button
          id="login-btn"
          type="button"
          disabled={loading || !email || !password}
          onClick={handleLogin}
          className="
            w-[80%] py-3 rounded-lg
            bg-gradient-to-r from-indigo-500 to-violet-600
            text-white font-medium
            hover:opacity-90 transition
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading ? <ClipLoader size={26} color="white" /> : "Login"}
        </button>

        {/* OR */}
        <div className="w-[80%] flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-white/40">OR</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* GOOGLE */}
        <button
          type="button"
          onClick={googleLogin}
          className="
            w-[80%] py-3 rounded-lg
            border border-white/10
            flex items-center justify-center gap-3
            text-white/80
            hover:bg-white/5 transition
          "
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
            alt="Google"
          />
          Continue with Google
        </button>

        <p className="text-sm text-white/50">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>

      {/* RIGHT — FUN GIF */}
<div className="hidden md:flex w-[50%] h-full bg-[#7ed1e6] relative overflow-hidden items-center justify-center">

  
  

  
  {/* content */}
  <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-10">

    <p className="text-[#1e293b] font-semibold text-2xl tracking-tight drop-shadow-sm">
      LearnFlow
    </p>

    <img
      src={funGif}
      alt="Fun Illustration"
      className="
        w-[90%] max-w-sm
       
        hover:scale-[1.02]
        transition-transform duration-500
      "
    />

    <p className="text-sm text-[#1e293b]/70 text-center max-w-xs">
      Learn smarter.  
      Stay focused.  
      Enjoy the journey.
    </p>

  </div>
</div>


    </form>
  </div>
);

    
 
}

export default Login
