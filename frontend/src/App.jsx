import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCurrentUser from "./customHooks/getCurrentUser.js";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import EditProfile from "./pages/EditProfile.jsx";
import Dashboard from "./pages/educator/Dashboard.jsx";
import Courses from "./pages/educator/Courses.jsx";
import CreateCourses from "./pages/educator/CreateCourses.jsx";
import getCreatorCourse from "./customHooks/getCreatorCourse.js";

export const serverUrl = "http://localhost:8000";

const App = () => {
  useCurrentUser();

  getCreatorCourse();


  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/signup"
          element={userData ? <Navigate to="/" replace /> : <SignUp />}
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to={"/signup"} />}
        />

        <Route
          path="/forgot"
          element={userData ? <ForgetPassword /> : <Navigate to={"/signup"} />}
        />

        <Route
          path="/editprofile"
          element={userData ? <EditProfile /> : <Navigate to={"/signup"} />}
        />

        <Route
          path="/dashboard"
          element={userData?.role ==='educator' ? <Dashboard/> : <Navigate to={"/signup"} />}
        />

         <Route
          path="/courses"
          element={userData?.role ==='educator' ? <Courses/> : <Navigate to={"/signup"} />}
        />


        <Route
          path="/create-courses"
          element={userData?.role ==='educator' ? <CreateCourses/> : <Navigate to={"/signup"} />}
        />






      </Routes>
    </>
  );
};

export default App;
