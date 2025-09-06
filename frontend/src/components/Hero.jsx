import { motion } from "framer-motion";
import Mindora from "../videos/mindora.mp4";
import ai from "../images/ai-girl.png";
import LettersPullUp from "./LettersPullUp";

const Hero = ({ handleGetStarted }) => {
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };
  
  const childVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        // delay: 1.5,
      },
    },
  };

  const visualVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration:1,
        ease: "easeOut",
      },
    },
  };
  return (
    <div className="relative min-h-screen w-full flex flex-col  md:flex-row-reverse  bg-[#000308]">
      {/* background-image */}
      <motion.div
        variants={visualVariant}
        initial="hidden"
        animate="visible"
        className=" hero-visual-right w-full  md:w-1/2 relative flex items-center justify-center p-8   ">
        <img
          className="w-full h-full object-cover"
          src={ai}
          alt="Ai BackGround "
        />
        {/*  HOLOGRAPHIC CARD  */}
        <div
          className="absolute top-1/2 left-1/2 w-[70%] aspect-video 
                     border border-cyan-400/40 rounded-lg 
                     bg-cyan-900/20 backdrop-blur-sm 
                     shadow-2xl shadow-cyan-500/40
                     overflow-hidden"
          // Step 3: 3D effect
          style={{
            transform:
              "translate(-50%, -50%) perspective(1000px) rotateY(-25deg) rotateX(10deg)",
          }}>
          {/* videos */}
          <video
            className=" absolute top-0 left-0 w-full h-full object-cover"
            src={Mindora}
            autoPlay
            loop
            muted
            playsInline></video>
        </div>
      </motion.div>
      <motion.div
      variants={containerVariant}
        initial="hidden"
        animate="visible"
        className="w-full md:w-1/2  flex flex-col items-center justify-center text-center p-8 z-10">
        <div className="text-4xl sm:text-5xl md:text-6xl leading-tight">
          <LettersPullUp
            text="Unlock the Power of AI with"
            className="text-white"
          />
          <LettersPullUp
            text="MinDora"
            className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
          />
        </div>
        <motion.p variants={childVariant} className="mt-4 max-w-2xl font-poppins text-center text-lg text-zinc-700 dark:text-zinc-300 overflow-hidden">
          Build modern AI-powered experiences faster with a beautiful,
          responsive starter.
        </motion.p>
        <motion.div className="mt-8 flex flex-col sm:flex-row gap-4 font-Orbitron">
          <button
            onClick={handleGetStarted}
            className="inline-flex btn-glass shadow-cyan-500/50 shadow-lg cursor-pointer items-center justify-center rounded-lg px-5 py-3 text-md font-semibold text-white hover:-translate-y-1 transition-transform">
            Get Started
          </button>
          <button className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-md font-semibold border border-white/10 text-zinc-100 hover:bg-white/5 transition-colors">
            Learn More
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
