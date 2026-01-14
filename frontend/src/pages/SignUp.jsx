import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "sonner";
import {User,Mail,Lock,Eye,EyeOff,GraduationCap,Briefcase,} from "lucide-react";

import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const handleSigup = async () => {
    setLoading(true);

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        { name, password, email, role },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data.user));

      setLoading(false);
      toast.success("Signup Successfully✅");
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

 const googleSignUp = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    const user = response.user;

    const result = await axios.post(
      serverUrl + "/api/auth/googleauth",
      {
        name: user.displayName,
        email: user.email,
        role,
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
  <div className="min-h-screen w-full bg-[#07090f] flex items-center justify-center px-4">
    <div className="relative w-full max-w-sm">

      {/* ambient aura */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-emerald-500/20 via-transparent to-indigo-500/20 blur-3xl pointer-events-none" />

      <div className="
        relative
        bg-[#0b1020]/80 backdrop-blur-xl
        border border-white/10
        rounded-2xl
        px-6 py-7
        shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]
      ">

        {/* HEADER */}
        <div className="text-center mb-7">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/5 flex items-center justify-center">
            <img src={logo} className="w-7 opacity-90" />
          </div>

          <h1 className="text-lg font-semibold text-white tracking-tight">
            Create account
          </h1>
          <p className="text-sm text-white/40 mt-1">
            One step closer to mastery
          </p>
        </div>

        <div className="space-y-4">

          <div>
  <label className="block text-sm text-white/50 mb-1">
    Full name
  </label>

  <div className="relative">
    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />

    <input
      id="signup-name"
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          document.getElementById("signup-email")?.focus();
        }
      }}
      placeholder="eg. Pnkj"
      className="
        w-full rounded-lg bg-black/40
        border border-white/10
        pl-10 pr-3 py-2.5
        text-sm text-white
        placeholder:text-white/30
        focus:outline-none
        focus:border-emerald-400/40
        focus:ring-1 focus:ring-emerald-400/30
        transition
      "
    />
  </div>
</div>


         <div>
  <label className="block text-sm text-white/50 mb-1">
    Email address
  </label>

  <div className="relative">
    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />

    <input
      id="signup-email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          document.getElementById("signup-password")?.focus();
        }
      }}
      placeholder="you@example.com"
      className={`
        w-full rounded-lg bg-black/40
        pl-10 pr-3 py-2.5 text-sm text-white
        placeholder:text-white/30
        focus:outline-none focus:ring-1 transition
        ${
          email.length === 0
            ? "border border-white/10"
            : /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)
            ? "border-emerald-400/40 focus:ring-emerald-400/30"
            : "border-red-400/40 focus:ring-red-400/30"
        }
      `}
    />
  </div>
</div>


        <div>
  <label className="block text-xs text-white/50 mb-1">
    Password
  </label>

  <div className="relative group">
    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-emerald-400 transition" />

    <input
      id="signup-password"
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          document.getElementById("role-student")?.focus();
        }
      }}
      placeholder="Minimum 6 characters"
      className="
        w-full rounded-lg bg-black/40
        border border-white/10
        pl-10 pr-10 py-2.5
        text-sm text-white
        placeholder:text-white/30
        focus:outline-none
        focus:border-emerald-400/40
        focus:ring-1 focus:ring-emerald-400/30
        transition
      "
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="
        absolute right-2 top-1/2 -translate-y-1/2
        w-7 h-7 rounded-full
        flex items-center justify-center
        text-white/40 hover:text-emerald-400
        hover:bg-white/5 transition
      "
    >
      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  </div>
</div>



          {/* ROLE */}
          <div className="grid grid-cols-2 gap-2">
  <button
    id="role-student"
    type="button"
    onClick={() => setRole("student")}
    className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs border transition ${
      role === "student"
        ? "border-emerald-400 bg-emerald-500/10 text-emerald-300"
        : "border-white/10 text-white/50 hover:bg-white/5"
    }`}
  >
    <GraduationCap size={14} />
    Student
  </button>

  <button
    type="button"
    onClick={() => setRole("educator")}
    className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs border transition ${
      role === "educator"
        ? "border-emerald-400 bg-emerald-500/10 text-emerald-300"
        : "border-white/10 text-white/50 hover:bg-white/5"
    }`}
  >
    <Briefcase size={14} />
    Educator
  </button>
</div>


          
          <button
            id="signup-submit"
            onClick={handleSigup}
            disabled={loading}
            className="
              w-full mt-3 py-2.5 rounded-lg
              bg-emerald-400 text-black
              text-sm font-medium
              hover:shadow-[0_0_40px_-10px_rgba(52,211,153,0.9)]
              active:scale-[0.97]
              transition
            "
          >
            {loading ? <ClipLoader size={16} color="black" /> : "Create account"}
          </button>

          {/* GOOGLE */}
          <button
            onClick={googleSignUp}
            className="
              w-full py-2.5 rounded-lg
              border border-white/10
              flex items-center justify-center gap-2
              text-sm text-white/80
              hover:bg-white/5
              transition
            "
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-4 h-4"
            />
            
            Continue with Google
          </button>
        </div>

        <p className="text-sm text-white/40 text-center mt-5">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-emerald-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  </div>
);








};

export default SignUp;
