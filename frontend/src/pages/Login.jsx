import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.png";
const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const loginHandler = async (data) => {
    try {
      const response = await axios.post(
        "https://mindora-f1yl.onrender.com/api/auth/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("user",JSON.stringify(response.data.user))
      if (response.data) {
        // Login successful, redirect to chat or home page
        navigate("/chats");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      console.error("Login error:", error);
    }
  };
  return (
    <>
      <div className="min-h-screen relative overflow-hidden bg-white bg-gradient-to-br from-black via-slate-800-900 to-cyan-900 flex items-center justify-center px-4 py-12">
        {/* floating particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="particle -left-10 top-10" />
          <div className="particle right-8 top-1/3 delay-1000" />
          <div className="particle -right-10 bottom-12 delay-2000" />
          <div className="particle left-1/3 bottom-24 delay-700" />
        </div>
        {/* form card */}
        <div className="relative w-full max-w-xl">
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-emerald-400/10 to-emerald-500/20 blur-2xl animate-gradient opacity-70" />
          {/* logo */}
          <div className="logo absolute -top-8 md:-top-10 z-[999] left-1/2 -translate-x-1/2">
          <img className=" w-24 md:w-32" src={logo} alt="logo" />
          </div>
          <div className="relative rounded-3xl glass-form border border-emerald-400/20 p-8 md:p-10">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-sora-bolditalic font-bold">
                <span className="bg-gradient-to-r from-purple-600 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Welcome back
                </span>
              </h1>
              <p className="mt-2 text-sm text-zinc-300/80 font-gilroy">
                Sign in to continue your conversation
              </p>
            </div>

            <form onSubmit={handleSubmit(loginHandler)} className="space-y-5">
              {/* Email */}
              <div className="form-field">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <div className="neon-input-wrapper">
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="neon-input"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-field">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <div className="neon-input-wrapper">
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="neon-input"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
              )}

              {/* Submit */}
              <button type="submit" className="neon-button w-full">
                <span className="relative z-10">Login</span>
                <span className="button-sheen" />
              </button>
              <h2 className="text-center font-gilroy-medium">
                I don't have an account{" "}
                <Link to="/register" className="text-fuchsia-500 underline">
                  Register
                </Link>
              </h2>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
