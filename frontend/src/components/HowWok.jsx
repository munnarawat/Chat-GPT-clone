import React from "react";
import { Link } from "react-router-dom";

const HowWok = () => {
  return (
    <section  className=" px-7  lg:px-20 pb-24 bg-gradient-to-br from-black via-slate-900 to-cyan-900">
      <h2 className="mb-8 text-3xl pt-10 font-bold font-Expo sm:text-5xl  text-center">
        <span className="bg-gradient-to-r from-purple-400/60 via-cyan-400/80 to-blue-400/80 bg-clip-text text-transparent">
          How It Works
        </span>
      </h2>
      {/* underline  */}
      <div className="h-[1px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-cyan-700 to-transparent opacity-30"></div>
      <ol className="relative border-s border-zinc-900/0 font-gilroy  ps-6 dark:border-white/20">
        <li className="mb-10 ms-6 mt-10">
          <span className="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-black text-sm font-bold ring-2 ring-emerald-400">
            1
          </span>
          <h3 className="mb-1 text-base font-semibold  text-white">
            Sign Up & Set Up
          </h3>
          <p className="text-sm text-zinc-400">
            Create your free Mindora account and connect your preferences in
            just a few clicks.
          </p>
        </li>
        <li className="mb-10 ms-6">
          <span className="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-black text-sm font-bold ring-2 ring-emerald-400">
            2
          </span>
          <h3 className="mb-1 text-base font-semibold text-white">
            Ask & Explore
          </h3>
          <p className="text-sm text-zinc-400">
            Chat with Mindora to brainstorm ideas, solve problems, or get
            personalized insights instantly.
          </p>
        </li>
        <li className="ms-6">
          <span className="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-black text-sm font-bold ring-2 ring-emerald-400">
            3
          </span>
          <h3 className="mb-1 text-base font-semibold text-white">
            Apply & Grow
          </h3>
          <p className="text-sm text-zinc-400">
            Use Mindora’s answers and strategies to level up your work,
            learning, and creativity.
          </p>
        </li>
      </ol>
      <div className="mt-8 flex font-Orbitron flex-col  gap-3 sm:flex-row justify-center">
        <Link
          to="/chats"
          className="inline-flex btn-glass shadow-cyan-500/50 shadow-lg cursor-pointer items-center justify-center rounded-lg px-5 py-3 text-md font-semibold text-white hover:-translate-y-1 transition-transform">
          Start Chatting
        </Link>
        <button className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold border border-zinc-900/10 text-zinc-800 hover:bg-zinc-900/5 dark:border-white/10 dark:text-zinc-100 dark:hover:bg-white/5">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default HowWok;
