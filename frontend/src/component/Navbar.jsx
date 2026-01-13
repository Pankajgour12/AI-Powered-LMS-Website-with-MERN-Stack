import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdPerson,IoIosInformationCircleOutline } from "react-icons/io";
import { IoBookSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiBook, FiCompass, FiStar, FiGrid, FiMenu, FiX,
} from "react-icons/fi";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "sonner";




const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);




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

const handleScrollTo = (id) => {
  setMobileOpen(false);

  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    navigate(`/#${id}`);
  }
};








useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    
    if (currentScrollY < 80) {
      setShowNav(true);
    } 
   
    else if (currentScrollY > lastScrollY) {
      setShowNav(false);
    } 
    else {
      setShowNav(true);
    }

    setLastScrollY(currentScrollY);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScrollY]);



  return (
   


    <motion.nav
    initial={{ y: 0 }}
  animate={{ y: showNav ? 0 : -100 }}
  transition={{ duration: 0.35, ease: "easeInOut" }}
    className="fixed top-0 left-0 w-full z-50 ">
      <div className="backdrop-blur-[5px]">
        <div className="max-w-7xl  mx-auto px-5 py-2 flex items-center text-white justify-between">
          {/* right */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src={logo} alt="logo" className="w-10 h-10" />
            <span className=" text-xl text-white  tracking-tight">LearnFlow</span>
          </div>

          <div className="hidden md:flex items-center text-white gap-8">
            <Link to="/" className="nav-modern">
              <FiHome /> Home
            </Link>
            <Link to="/allcourses" className="nav-modern">
              <FiBook /> Courses
            </Link>
            <button onClick={() => handleScrollTo("explore")} className="nav-modern">
  <FiCompass /> Explore
</button>

           
           <button onClick={() => handleScrollTo("about")} className="nav-modern">
         <IoIosInformationCircleOutline />  About
</button>
          </div>

          <div className="hidden md:flex items-center gap-4 relative">
            {!userData && (
              <div className="relative">
                <button
                  onClick={() => setAuthOpen(!authOpen)}
                  className="px-5 py-2 rounded-full border border-rose-300 text-rose-600 font-medium hover:bg-rose-100 transition cursor-pointer"
                >
                  Login
                </button>

                {authOpen && (
                  <div className="absolute right-0 mt-3 w-40 bg-zinc-500 rounded-xl shadow-lg border  overflow-hidden animate-fade-in">
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-600 cursor-pointer"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate("/signup")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-600 cursor-pointer"
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
    className="
      relative group
      flex items-center gap-2
      px-4 py-2
      rounded-md
      cursor-pointers
      text-sm font-medium tracking-wide
      text-white/80

      bg-[#0b0d16]/70
      backdrop-blur-xl
      border border-white/10

      shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_30px_rgba(0,0,0,0.6)]

      transition-all duration-300 ease-out
      hover:text-white
      hover:-translate-y-[1px]
      active:translate-y-0

      overflow-hidden
    "
  >
    
    <span
      className="
        pointer-events-none
        absolute inset-0
        opacity-0 group-hover:opacity-100
        transition-opacity duration-500
        bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)]
        animate-[shine_2.2s_linear_infinite]
      "
    />

   
    <span
      className="
        pointer-events-none
        absolute inset-0
        rounded-md
        bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.25),transparent_60%)]
        opacity-0 group-hover:opacity-100
        transition-opacity duration-500
      "
    />

    {/* icon */}
    <FiGrid
      className="
        relative z-10
        text-[15px]
        text-white/60
        group-hover:text-white
        transition-colors
      "
    />

    {/* label */}
    <span className="relative z-10">
      Dashboard
    </span>
  </button>
)}

{userData && (
  <button
    onClick={() => navigate("/mycourses")}
    className="
      relative group
      flex items-center gap-2
      px-4 py-2
      rounded-md
      cursor-pointers
      text-sm font-medium tracking-wide
      text-white/80

      bg-[#0b0d16]/70
      backdrop-blur-xl
      border border-white/10

      shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_30px_rgba(0,0,0,0.6)]

      transition-all duration-300 ease-out
      hover:text-white
      hover:-translate-y-[1px]
      active:translate-y-0

      overflow-hidden
    "
  >
    
    <span
      className="
        pointer-events-none
        absolute inset-0
        opacity-0 group-hover:opacity-100
        transition-opacity duration-500
        bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)]
        animate-[shine_2.2s_linear_infinite]
      "
    />

   
    <span
      className="
        pointer-events-none
        absolute inset-0
        rounded-md
        bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.25),transparent_60%)]
        opacity-0 group-hover:opacity-100
        transition-opacity duration-500
      "
    />

    {/* icon */}
    <IoBookSharp 
      className="
        relative z-10
        text-[15px]
        text-white/60
        group-hover:text-white
        transition-colors
      "
    />

    {/* label */}
    <span className="relative z-10">
      My Courses
    </span>
  </button>
)}


                

                <div className="relative">
                  {/* Image */}
                  <div
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center cursor-pointer transition hover:scale-105 border border-white/20  bg-white/10
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
                        className="w-full text-left px-4 py-2  cursor-pointer  text-sm text-black hover:bg-gray-100 nav-modern"
                      >
                        <IoMdPerson />
                        My Profile
                      </button>

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigate("/mycourses");
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 nav-modern cursor-pointer"
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
        bg-[#07080d]
        text-white
        flex flex-col
        overscroll-none
      "
    >
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="w-9 h-9" />
          <span className="text-lg font-semibold tracking-tight">
            LearnFlow
          </span>
        </div>

        <button
          onClick={() => setMobileOpen(false)}
          className="
            w-10 h-10
            rounded-full
            bg-white/5
            flex items-center justify-center
            hover:bg-white/10
            transition
          "
        >
          <FiX size={20} />
        </button>
      </div>

      {/* NAV LINKS */}
      <div className="flex-1 px-6 py-6 space-y-3">
        {[
          { to: "/", icon: FiHome, label: "Home" },
          { to: "/allcourses", icon: FiBook, label: "Courses" },
          { to: "#explore", icon: FiCompass, label: "Explore" },
          { to: "#about", icon: IoIosInformationCircleOutline, label: "About" },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div key={i} variants={menuItem}>
              <Link
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="
                  group
                  flex items-center gap-4
                  px-5 py-4
                  rounded-2xl
                  bg-white/[0.03]
                  hover:bg-white/[0.08]
                  transition
                "
              >
                <Icon className="text-xl text-white/70 group-hover:text-white" />
                <span className="text-base font-medium">
                  {item.label}
                </span>
              </Link>
            </motion.div>
          );
        })}

        {/* MY COURSES */}
        {userData && (
          <motion.div variants={menuItem}>
            <button
              onClick={() => navigate("/mycourses")}
              className="
                w-full
                mt-4
                flex items-center gap-4
                px-5 py-4
                rounded-2xl
                bg-gradient-to-r from-indigo-500/20 to-emerald-500/20
                border border-white/10
                hover:border-white/20
                transition
              "
            >
              <IoBookSharp className="text-xl text-white" />
              <span className="text-base font-medium">
                My Courses
              </span>
            </button>
          </motion.div>
        )}

        {/* DASHBOARD */}
        {userData?.role === "educator" && (
          <motion.div variants={menuItem}>
            <button
              onClick={() => {
                setMobileOpen(false);
                navigate("/dashboard");
              }}
              className="
                w-full
                flex items-center gap-4
                px-5 py-4
                rounded-2xl
                bg-white/10
                hover:bg-white/20
                transition
              "
            >
              <FiGrid className="text-xl" />
              <span className="text-base font-medium">
                Dashboard
              </span>
            </button>
          </motion.div>
        )}
      </div>

      {/* USER / AUTH SECTION */}
      <div className="px-6 py-6 border-t border-white/10">
        {!userData && (
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="
                flex-1
                py-3
                rounded-xl
                bg-white/10
                hover:bg-white/20
                transition
                text-sm font-medium
              "
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="
                flex-1
                py-3
                rounded-xl
                bg-white
                text-black
                font-medium
                text-sm
                hover:opacity-90
                transition
              "
            >
              Get started
            </button>
          </div>
        )}

        {userData && (
          <div className="space-y-4">
            {/* PROFILE */}
            <div className="
              flex items-center gap-4
              p-4
              rounded-2xl
              bg-white/5
            ">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                {userData.photoUrl ? (
                  <img src={userData.photoUrl} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-semibold">
                    {userData.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {userData.name}
                </p>
                <p className="text-xs text-white/50 capitalize">
                  {userData.role}
                </p>
              </div>

              <button
                onClick={() => navigate("/profile")}
                className="text-xs text-white/70 hover:text-white"
              >
                View
              </button>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between">
              <button
                onClick={() => navigate("/mycourses")}
                className="text-sm text-white/70 hover:text-white"
              >
                My Courses
              </button>

              <button
                onClick={handleLogout}
                className="text-sm text-rose-500 hover:text-rose-400"
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


      

     




      
      

      
    </motion.nav>
    
  );
};

export default Navbar;
