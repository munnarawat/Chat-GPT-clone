import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LettersPullUp from "../animation/LettersPullUp";

const MotionLink = motion.create(Link);
const HowWok = () => {
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        // delayChildren: 0.5,
      },
    },
  };
  const childVariant = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };
  const buttonVariant = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      },
    },
  };
  return (
    <section className=" px-7  lg:px-20 pb-24 ">
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full relative ">
        <div className="mb-8 text-3xl pt-10 font-bold font-Expo sm:text-5xl lg:text-6xl  text-center">
          <LettersPullUp
            text="How It Works"
            className="bg-gradient-to-r from-fuchsia-500 via-purple-600 to-cyan-400 bg-clip-text text-transparent"
          />
        </div>
        {/* underline */}
        <div className="h-[1px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-cyan-700 to-transparent opacity-30"></div>
      </motion.div>
      {/* use-case */}
      <motion.ol
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative border-s border-zinc-900/0 font-poppins  ps-6 dark:border-white/20">
        <motion.li
          variants={childVariant}
          className="mb-10 ms-6 mt-10  relative">
          <span className="absolute  -start-16 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-white text-sm font-bold ring-2 ring-purple-500/50">
            1
          </span>
          <h3 className="mb-1  text-base font-semibold  text-white">
            Sign Up & Set Up
          </h3>
          <p className="text-sm text-zinc-400">
            Create your free Mindora account and connect your preferences in
            just a few clicks.
          </p>
        </motion.li>
        <motion.li variants={childVariant} className="mb-10 ms-6 relative">
          <span className="absolute -start-16 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-white text-sm font-bold ring-2 ring-purple-500/50">
            2
          </span>
          <h3 className="mb-1 text-base font-semibold text-white">
            Ask & Explore
          </h3>
          <p className="text-sm text-zinc-400">
            Chat with Mindora to brainstorm ideas, solve problems, or get
            personalized insights instantly.
          </p>
        </motion.li>
        <motion.li variants={childVariant} className="ms-6 relative">
          <span className="absolute -start-16 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-white text-sm font-bold ring-2 ring-purple-500/50">
            3
          </span>
          <h3 className="mb-1 text-base font-semibold text-white">
            Apply & Grow
          </h3>
          <p className="text-sm text-zinc-400">
            Use Mindora’s answers and strategies to level up your work,
            learning, and creativity.
          </p>
        </motion.li>
      </motion.ol>

      {/* buttons */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-10 flex font-Orbitron flex-col  gap-3 sm:flex-row justify-center">
        <MotionLink
          variants={buttonVariant}
          whileTap={{scale:0.8}}
          to="/chats"
          className="inline-flex btn-glass shadow-cyan-500/50 shadow-lg cursor-pointer items-center justify-center rounded-lg px-5 py-3 text-md font-semibold text-white hover:-translate-y-1 transition-transform">
          Start Chatting
        </MotionLink>
        <motion.button
          variants={buttonVariant}
          whileTap={{scale:0.9}}
          className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold border border-zinc-900/10 text-zinc-800 hover:bg-zinc-900/5 dark:border-white/10 dark:text-zinc-100 dark:hover:bg-white/5">
          Learn More
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HowWok;
