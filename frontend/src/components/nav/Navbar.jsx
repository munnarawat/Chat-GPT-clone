import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { HiMenuAlt1 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../store/reducer/authSlice";
import axios from "axios";

const Navbar = ({toggleNavbar}) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logOut",
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      localStorage.removeItem('user')
      navigate("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <nav className="sticky top-0 z-[9999] w-full border-b   border-white/5  backdrop-blur ">
      <div className="mx-auto  flex max-w-6xl items-center justify-between px-2 py-0.5">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-24" src={logo} alt="" />
        </Link>
        <div className="md:flex items-center hidden gap-2 sm:gap-4 font-Expo">
          <Link to='/#features' className=" rounded-2xl px-5 py-2 text-md font-medium text-zinc-700 hover:bg-zinc-900/5 dark:text-zinc-200 dark:hover:bg-white/5 hover:scale-105 duration-300 ">
            Features
          </Link>
          <Link to="/#howitworks" className="rounded-2xl px-5 py-2 text-md font-medium text-zinc-700 hover:bg-zinc-900/5 dark:text-zinc-200 dark:hover:bg-white/5 hover:scale-105 duration-300 ">
            How it Works
          </Link>
          <Link to="/#pricing" className="hidden  rounded-2xl px-5 py-2 text-md font-medium text-zinc-700 hover:bg-zinc-900/5 sm:block dark:text-zinc-200 dark:hover:bg-white/5 hover:scale-105 duration-300 ">
            Pricing
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="inline-flex btn-glass cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-md font-semibold hover:-translate-y-0.5">
              logOut
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex btn-glass cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-md font-semibold hover:-translate-y-0.5">
              Login
            </Link>
          )}
        </div>
        <span onClick={toggleNavbar} className="text-2xl mr-2 cursor-pointer flex md:hidden">
          <HiMenuAlt1 />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
