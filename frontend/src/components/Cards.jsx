import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import developer from "../images/ai-developer.png";
import marketers from "../images/ai-marketers.png";
import Businesses from "../images/Businesses.png";
import Content from "../images/Content-Creators.png";
import LettersPullUp from "../animation/LettersPullUp";
// STEP 1: Customize this array with your features.
const Features = [
  {
    id: "smart-chat",
    title: "Powerful APIs for Modern Developers",
    description:
      "Integrate MinDora's robust API seamlessly into your applications. Access powerful AI features with clean documentation and build next-gen solutions faster than ever.",
    media: developer,
  },
  {
    id: "code-gen",
    title: "AI-Powered Marketing Automation",
    description:
      "Stop guessing, start converting. MinDora helps you create data-driven, personalized marketing campaigns that boost your ROI and save you time.",
    media: marketers,
  },
  {
    id: "data",
    title: "Advanced Data Analysis",
    description:
      "Beat writer's block forever. Generate high-quality articles, scripts, and social media posts in minutes, not hours. Let AI be your creative co-pilot..",
    media: Content,
  },
  {
    id: " Businesses",
    title: "For Businesses",
    description:
      "Provide instant, 24/7 support to your customers with our intelligent AI agents. Improve satisfaction, reduce response times, and streamline your operations.",
    media: Businesses,
  },
];
// Helper component for a single card
const FeatureCard = ({ feature, i, progress, range }) => {
  // useTransform hook scroll progress ko opacity aur scale mein convert karega
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const scale = useTransform(progress, range, [0.8, 1, 1, 0.8]);
  const rotateX = useTransform(progress, range, [30, 0, 0, -30]);
  const x = useTransform(progress, range, ["50%", "0%", "0%", "-50%"]);
  return (
    <motion.div
      style={{
        opacity,
        scale,
        rotateX,
        x,
        transformStyle: "preserve-3d",
      }}
      className="w-full h-full  text-center flex font-Expo flex-col items-center justify-center z-[999] roup relative p-8 rounded-2xl bg-slate-800/40 backdrop-blur-md border border-purple-400/20 hover:border-cyan-400/80 transition-all duration-300
      hover:scale-105 hover:shadow-2xl  hover:shadow-cyan-500/40">
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse">
      </div>
      <div
        className="w-full h-3/4 flex items-center justify-center"
        style={{ perspective: "1000px" }}>
        <img
          src={feature.media}
          alt={feature.title}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        />
      </div>
      <h3 className="text-3xl font-bold mt-6 mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent ">
        {feature.title}
      </h3>
      <p className="text-slate-300 tracking-tight max-w-md mx-auto">{feature.description}</p>
    </motion.div>
  );
};
// Main component
const Cards = () => {
  const targetRef = useRef(null);
  // useScroll hook scroll progress ko track karega
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"], // Animation start se end tak chalega
  });
  // amimtion
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: 0.7,
      },
    },
  };
  return (
    <section ref={targetRef} className="relative futuristic-background  w-full h-[500vh]">
      {/* Yeh div screen par chipka rahega */}
      <motion.div variants={containerVariant} initial="hidden" whileInView="visible" 
       viewport={{once:true, amount:0.1}} className="text-center mb-16">
        <div className="font-bold font-Expo mb-6 py-5">
          <LettersPullUp text="Use Cases / Benefits" className='bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent text-4xl md:text-5xl  tracking-tighter'/>
        </div>
        <motion.p variants={childVariant} className="  md:text-lg lg:px-10 text-slate-300-300 font-poppins px-8 sm:max-w-xl lg:max-w-2xl mx-auto ">
          Go beyond features and focus on outcomes. See how MinDora boosts productivity, simplifies complex tasks, and provides actionable insights for your specific needs.
        </motion.p>
      </motion.div>
      <motion.div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {Features.map((feature, i) => {
          // Har card ke liye scroll range define karein
          const totalFeatures = Features.length;
          const start = i / totalFeatures;
          const end = (i + 1) / totalFeatures;

          return (
            <div key={feature.id} className="absolute w-[80vw] h-[80vh]">
              <FeatureCard
                feature={feature}
                i={i}
                progress={scrollYProgress}
                range={[start, start + 0.05, end - 0.05, end]}
              />
            </div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Cards;
