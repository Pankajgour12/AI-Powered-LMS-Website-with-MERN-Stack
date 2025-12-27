import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import {
  FiHome,
  FiBook,
  FiCompass,
  FiStar,
  FiGrid,
  FiMenu,
  FiX,
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
            <span className="text-xl font-bold text-gray-800">
              LearnFlow
            </span>
          </div>

         
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="nav-modern"><FiHome /> Home</Link>
            <Link to="/courses" className="nav-modern"><FiBook /> Courses</Link>
            <Link to="/explore" className="nav-modern"><FiCompass /> Explore</Link>
            <Link to="/educator" className="nav-modern"><FiStar /> Educators</Link>
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

                <div
                  onClick={() => navigate("/profile")}
                  className="w-11 h-11 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center font-bold cursor-pointer hover:scale-105 transition"
                >
                  {userData.name?.charAt(0).toUpperCase()}
                </div>

                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-rose-600 transition cursor-pointer"
                >
                  Logout
                </button>
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
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl shadow-lg px-6 py-6 space-y-5 animate-slide-down">

          <Link to="/" onClick={() => setMobileOpen(false)} className="mobile-modern">
            <FiHome /> Home
          </Link>
          <Link to="/courses" onClick={() => setMobileOpen(false)} className="mobile-modern">
            <FiBook /> Courses
          </Link>
          <Link to="/explore" onClick={() => setMobileOpen(false)} className="mobile-modern">
            <FiCompass /> Explore
          </Link>
          <Link to="/educator" onClick={() => setMobileOpen(false)} className="mobile-modern">
            <FiStar /> Educators
          </Link>

          <div className="h-px bg-gray-200  " />

          {!userData && (
            <>
             <div className="flex flex-col items-start  gap-2" >
                 <button onClick={() => navigate("/login")} className="nav-signup">
                Login
              </button>
              <button onClick={() => navigate("/signup")} className="nav-signup text-rose-600">
                Sign up
              </button>
             </div>
            </>
          )}

          {userData && (
            <>
              {userData.role === "educator" && (
                <button onClick={() => navigate("/dashboard")} className="mobile-modern">
                  <FiGrid /> Dashboard
                </button>
              )}
              <button onClick={() => navigate("/profile")} className="mobile-modern">
                Profile
              </button>
              <button onClick={handleLogout} className="mobile-modern nav-signup text-rose-600">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
