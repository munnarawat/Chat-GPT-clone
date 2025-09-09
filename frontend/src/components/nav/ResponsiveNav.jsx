import { animate, AnimatePresence, motion, scale } from "framer-motion";
import logo from "../../images/logo.png";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login, logout } from "../../store/reducer/authSlice";
const MotionLink = motion.create(Link);
const ResponsiveNav = ({ closeMenu }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const linkVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logOut",
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      localStorage.removeItem("user");
      closeMenu();
      navigate("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{x:"100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden fixed font-poppins right-0 top-0 h-screen w-[90%]  bg-gradient-to-br from-slate-900 to-emerald-950 border border-r border-slate-700/50  z-[9999]">
        {/* logo and close  */}
        <div className="w-full   flex items-center justify-between ">
          <Link to="/" onClick={closeMenu}>
            <img className="w-24 object-cover" src={logo} alt="" />
          </Link>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="mr-4 text-xl font-semibold text-gray-400 cursor-pointer hover:text-green-400 transition-colors hover:scale-110 duration-300">
            <AiOutlineClose />
          </button>
        </div>
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          className="links w-full mt-14 flex flex-col gap-8 font-Expo px-4 py-2">
          <MotionLink
            to="/#features"
            variants={linkVariant}
            whileHover={{ x: 20, color: "#FDFFB8" }}
            onClick={closeMenu}
            className=" text-4xl sm:text-5xl font-semibold">
            Features
          </MotionLink>
          <MotionLink
            to="/#howitworks"
            variants={linkVariant}
            whileHover={{ x: 20, color: "#FDFFB8" }}
            onClick={closeMenu}
            className=" text-4xl sm:text-5xl font-semibold ">
            How it Works
          </MotionLink>
          <MotionLink
            to="/#pricing"
            variants={linkVariant}
            whileHover={{ x: 20, color: "#FDFFB8" }}
            onClick={closeMenu}
            className=" text-4xl sm:text-5xl font-semibold">
            Pricing
          </MotionLink>
          {user ? (
            <motion.button
              variants={linkVariant}
              whileHover={{ x: 20, color: "#FDFFB8" }}
              onClick={handleLogout}
              className="text-4xl text-left cursor-pointer sm:text-5xl font-semibold">
              LogOut
            </motion.button>
          ) : (
            <MotionLink
              to="/login"
              variants={linkVariant}
              whileHover={{ x: 20, color: "#FDFFB8" }}
              onClick={closeMenu}
              className="text-4xl sm:text-5xl font-semibold ">
              Login
            </MotionLink>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResponsiveNav;
