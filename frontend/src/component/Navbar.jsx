import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";
import { IoBookSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

import { FiHome, FiBook, FiCompass, FiStar, FiGrid, FiMenu, FiX,
} from "react-icons/fi";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

const menuWrap = {
  hidden: { y: "-100%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
  exit: { y: "-100%", opacity: 0, transition: { duration: 0.3 } },
};

const menuItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};



  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="backdrop-blur-xl bg-white/70 border-b border-white/30 shadow-md">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* right */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img src={logo} alt="logo" className="w-10 h-10" />
            <span className="text-xl font-bold text-gray-800">LearnFlow</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="nav-modern">
              <FiHome /> Home
            </Link>
            <Link to="/courses" className="nav-modern">
              <FiBook /> Courses
            </Link>
            <Link to="/explore" className="nav-modern">
              <FiCompass /> Explore
            </Link>
            <Link to="/educator" className="nav-modern">
              <FiStar /> Educators
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4 relative">
            {!userData && (
              <div className="relative">
                <button
                  onClick={() => setAuthOpen(!authOpen)}
                  className="px-5 py-2 rounded-full border border-rose-300 text-rose-600 font-medium hover:bg-rose-50 transition cursor-pointer"
                >
                  Login
                </button>

                {authOpen && (
                  <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg border overflow-hidden animate-fade-in">
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate("/signup")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Sign up
                    </button>
                  </div>
                )}
              </div>
            )}

            {userData && (
              <>
                {userData.role === "educator" && (
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm shadow hover:scale-105 transition"
                  >
                    <FiGrid className="inline mr-1" />
                    Dashboard
                  </button>
                )}

                <div className="relative">
                  {/* ImageIcone */}
                  <div
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center cursor-pointer transition hover:scale-105 border border-white/20  bg-rose-300
  "
                  >
                    {userData?.photoUrl ? (
                      <img
                        src={userData.photoUrl}
                        alt={userData?.name || "User"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-sm font-semibold text-white">
                        {userData?.name
                          ? userData.name.charAt(0).toUpperCase()
                          : "U"}
                      </span>
                    )}
                  </div>

                  {userMenuOpen && (
                    <div
                      className="
        absolute right-0 mt-2 w-36
        bg-white border border-gray-200
        rounded-md shadow-lg
        overflow-hidden
        z-50
        flex flex-col gap-2
       
      "
                    >
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigate("/profile");
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 nav-modern"
                      >
                        <IoMdPerson />
                        My Profile
                      </button>

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigate("/mycourses");
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 nav-modern"
                      >
                        <IoBookSharp />
                        My Courses
                      </button>

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full text-left px-4 py-2  text-sm text-rose-600 hover:bg-sky-100 cursor-pointer "
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-2xl"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}

      <AnimatePresence>
      {mobileOpen && (
    <motion.div
      variants={menuWrap}
      initial="hidden"
      animate="show"
      exit="exit"
      className="
        fixed inset-0 z-50 md:hidden
        bg-white/95 backdrop-blur-xl
        flex flex-col
      "
    >
      
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <span className="text-base font-semibold tracking-tight text-gray-900">
          LearnFlow
        </span>

        <button
          onClick={() => setMobileOpen(false)}
          className="
            p-2 rounded-full
            hover:bg-gray-100
            transition
          "
        >
          <FiX size={22} />
        </button>
      </div>

      
      <div className="flex flex-col px-6 py-6 gap-3 flex-1">
        {[
          { to: "/", icon: FiHome, label: "Home" },
          { to: "/courses", icon: FiBook, label: "Courses" },
          { to: "/explore", icon: FiCompass, label: "Explore" },
          { to: "/educator", icon: FiStar, label: "Educators" },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div key={i} variants={menuItem}>
              <Link
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-4 px-4 py-3 rounded-xl  text-gray-800  hover:bg-gray-100  transition"
              >
                <Icon className="text-lg text-gray-500" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </motion.div>
          );
        })}

      
        {userData?.role === "educator" && (
          <motion.div variants={menuItem}>
            <button
              onClick={() => {
                setMobileOpen(false);
                navigate("/dashboard");
              }}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-gray-800 text-white hover:bg-gray-600 transition"
            >
              <FiGrid className="text-lg" />
              <span className="text-sm font-medium">Dashboard</span>
            </button>
          </motion.div>
        )}
      </div>

     
      <div className="border-t border-gray-400 px-6 py-10">
        {!userData && (
        <div className="flex items-center gap-3">
  <button
    onClick={() => navigate("/login")}
    className="text-sm font-medium text-gray-800 hover:text-black transition"
  >
    Login
  </button>

  <button
    onClick={() => navigate("/signup")}
    className="px-6 py-2.5 rounded-full border border-rose-500  text-rose-600 font-medium  hover:bg-rose-50 transition
    "
  >
    Get started
  </button>
</div>





        )}

        {userData && (
          <div className="space-y-4">
            {/* PROFILE CARD */}
            <div className="
              flex items-center gap-4
              px-4 py-3
              rounded-2xl
              bg-gray-100
            ">
              <div
                className="
                  w-12 h-12
                  rounded-full
                  bg-rose-500 text-white
                  flex items-center justify-center
                  font-semibold
                  overflow-hidden
                "
              >
                {userData.photoUrl ? (
                  <img
                    src={userData.photoUrl}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  userData.name?.charAt(0).toUpperCase()
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {userData.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {userData.role}
                </p>
              </div>

              <button
                onClick={() => navigate("/profile")}
                className="text-xs text-rose-600 hover:underline"
              >
                View
              </button>
            </div>

            {/* USER ACTIONS */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate("/mycourses")}
                className="
                  text-sm text-gray-700
                  hover:text-black
                  transition
                "
              >
                My Courses
              </button>

              <button
                onClick={handleLogout}
                className="
                  text-sm text-rose-600
                  hover:text-rose-700
                  transition
                "
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )}
</AnimatePresence>

     

      
      

      
    </nav>
  );
};

export default Navbar;
