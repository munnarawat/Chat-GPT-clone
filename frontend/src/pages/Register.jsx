import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.png";
const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const registerHandler = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          fullName: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        // Registration successful
        navigate("/login");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      console.error("Registration error:", error);
    }
  };
  return (
    <>
      <div className="min-h-screen font-poppins relative overflow-hidden bg-white bg-gradient-to-br from-black via-slate-800-900 to-cyan-900 flex items-center justify-center px-4 py-12">
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
              <h1 className="text-3xl md:text-4xl font-Expo font-bold  ">
                <span className="bg-gradient-to-r from-purple-600 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Create your Account
                </span>
              </h1>
              <p className="mt-2 text-sm text-zinc-300/80 font-poppins">
                Join the future of AI conversations
              </p>
            </div>
            {/* register  */}
            <form
              onSubmit={handleSubmit(registerHandler)}
              className="space-y-5">
              {/* Name fields */}
              <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-field">
                  <label className="form-label" htmlFor="firstName">
                    First name
                  </label>
                  <div className="neon-input-wrapper">
                    <input
                      {...register("firstName", {
                        required: "First name is required",
                        minLength: {
                          value: 2,
                          message: "First name must be at least 2 characters",
                        },
                      })}
                      id="firstName"
                      type="text"
                      placeholder="John"
                      className={`neon-input ${
                        errors.firstName ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="lastName">
                    Last name
                  </label>
                  <div className="neon-input-wrapper">
                    <input
                      {...register("lastName", {
                        required: "Last name is required",
                        minLength: {
                          value: 2,
                          message: "Last name must be at least 2 characters",
                        },
                      })}
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      className={`neon-input ${
                        errors.lastName ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

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
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`neon-input ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
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
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                      },
                    })}
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className={`neon-input ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* Submit */}
              {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
              )}
              <button
                type="submit"
                className="neon-button font-Exp cursor-pointer w-full">
                <span className="relative z-10">Register</span>
                <span className="button-sheen" />
              </button>
              <h2 className="text-center font-gilroy-medium">
                I have an account{" "}
                <Link to="/login" className="text-fuchsia-500 underline">
                  {" "}
                  Login
                </Link>
              </h2>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
