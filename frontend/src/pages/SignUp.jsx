import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "sonner";

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
    <div className="bg-gray-900 w-[100vw] h-[100vh] flex items-center justify-center">
      <form
        className="w-[90%] md:w-200 h-150 bg-amber-50 shadow-xl rounded-2xl flex "
        onSubmit={(e) => e.preventDefault()}
      >
        {/* left div */}
        <div className="md:w-[50%] w-full h-full flex flex-col items-center justify-center gap-3">
          <div className="text-center ">
            <h1 className="font-semibold text-rose-800 text-2xl">
              Let's get started
            </h1>
            <h2 className="text-rose-950">Create your account</h2>
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start px-3">
            <label htmlFor="name" className="font-semibold text-sm">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              required
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start px-3">
            <label htmlFor="email" className="font-semibold text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              required
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start px-3">
            <label htmlFor="password" className="font-semibold text-sm">
              Password
            </label>

            <div className="relative w-full">
              <input
                type="password"
                id="password"
                placeholder="Minimum 6 characters"
                required
                minLength={6}
                className="w-full p-2 pr-10 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById("password");
                  input.type = input.type === "password" ? "text" : "password";
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-rose-600 transition"
                title="Show / Hide Password"
              >
                👁
              </button>
            </div>

            <span className="text-xs text-gray-500">
              Password must be at least 6 characters
            </span>
          </div>

         {/* Role Selection */}
           <div className="flex flex-col gap-2 w-[80%] items-start px-3">
           <label className="font-semibold text-sm">Select Role</label>

          <div className="flex gap-3 w-full">
           {/* STUDENT */}
             <label className="flex-1 cursor-pointer">
      <input
        type="radio"
        name="role"
        value="student"
        className="hidden peer"
        checked={role === "student"}
        onChange={() => setRole("student")}
      />
      <div className="p-2 text-center rounded-md border border-gray-400 peer-checked:border-rose-500 peer-checked:bg-rose-50">
        Student
      </div>
    </label>

    {/* EDUCATOR */}
    <label className="flex-1 cursor-pointer">
      <input
        type="radio"
        name="role"
        value="educator"
        className="hidden peer"
        checked={role === "educator"}
        onChange={() => setRole("educator")}
      />
      <div className="p-2 text-center rounded-md border border-gray-400 peer-checked:border-rose-500 peer-checked:bg-rose-50">
        Educator
      </div>
    </label>
  </div>
</div>


          <button
            type="submit"
            className="w-[80%] p-2 rounded-md bg-rose-600 text-white font-medium hover:bg-rose-700 transition cursor-pointer "
            onClick={handleSigup}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={30} color="#e11d48" />
            ) : (
              "Create Account"
            )}
          </button>

          <div className="w-[80%] flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Signup */}
          <button
            onClick={googleSignUp}
            className="w-[80%] flex items-center justify-center gap-3 p-2 rounded-md border border-gray-400 hover:bg-gray-100 transition cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
              alt="Google"
            />
            <span className="font-medium">Sign up with Google</span>
          </button>

          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-rose-600 font-medium cursor-pointer hover:underline"
            >
              Login
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
          {/* soft overlay for depth */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />

          {/* subtle glow shapes */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-white/30 rounded-full blur-[120px]" />

          {/* content */}
          <div className="relative z-10 flex flex-col items-center text-center gap-5 px-10">
            <img src={logo} alt="logo" className="w-28 drop-shadow-lg" />

            <h1 className="text-3xl font-bold tracking-tight text-gray-800">
              LearnFlow
            </h1>

            <p className="text-sm text-gray-700 leading-relaxed max-w-xs">
              Learn with clarity. Grow with confidence. A calm space for focused
              learning.
            </p>

            <span className="mt-2 text-xs text-gray-600 bg-white/60 px-4 py-1 rounded-full">
              AI-Powered Learning Platform
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
