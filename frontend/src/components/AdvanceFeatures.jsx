import React, { useEffect, useState } from "react";
import brain from "../../src/images/brain.webp";
import multiLang from "../../src/images/Multi-lang.webp";
import security from "../../src/images/Security.webp";
import speed from "../../src/images/Speed.webp";
import chatbot from "../../src/images/chatbot.webp";
import { motion } from "framer-motion";
import LettersPullUp from "../animation/LettersPullUp";
const AdvanceFeatures = () => {
  const Features = [
    {
      image: chatbot,
      title: "Smart AI Conversations",
      description:
        "Experience intelligent conversations with our advanced AI that understands context and provides meaningful responses in real-time.",
      buttonText: "Start Chat",
    },
    {
      image: multiLang,
      title: "Multilingual Support",
      description:
        "Break language barriers with our AI that supports multiple languages and provides seamless translation capabilities.",
      buttonText: "Explore Languages",
    },
    {
      image: brain,
      title: "Context Awareness",
      description:
        "Our AI remembers conversation context and provides coherent, relevant responses throughout your entire interaction.",
      buttonText: "Learn More",
    },
    {
      image: security,
      title: "Security & Privacy",
      description:
        "Your conversations are protected with enterprise-grade encryption and privacy controls you can trust.",
      buttonText: "Security Info",
    },
    {
      image: speed,
      title: "Speed & Performance",
      description:
        "Lightning-fast responses powered by optimized AI models that deliver results in milliseconds.",
      buttonText: "Test Speed",
    },
    {
      image: brain,
      title: "Analytics & Insights",
      description:
        "Get detailed analytics and insights about your AI interactions to optimize your workflow.",
      buttonText: "View Analytics",
    },
  ];
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
  const cardVariants = {
    hidden: (direction) => {
      return {
        opacity: 0,
        x: direction === "left" ? -80 : direction === "right" ? 80 : 0,
        y: direction === "middle" ? 80 : 0,
        scale: 0.9,
      };
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 20,
      },
    },
  };
  const [isMobile, setIsMobile] = useState(false);
  // mobile size and animtion 
  useEffect(()=> {
    const mediaQurey = window.matchMedia("(max-width:768px)");

    setIsMobile(mediaQurey.matches);

    const handler = (event)=> setIsMobile(event.matches);
    mediaQurey.addEventListener("change", handler);

    return () => mediaQurey.removeEventListener("change",handler)
  },[])
  return (
    <div
      id="features"
      className="relative w-full min-h-screen overflow-hidden ">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-16">
          <div className="text-3xl md:text-5xl font-bold font-Expo mb-6">
            <LettersPullUp
              text="Advanced Features"
              className="animate-gradient bg-gradient-to-r from-fuchsia-500 via-purple-600 to-cyan-400 bg-[length:200%_auto] bg-clip-text text-transparent"
            />
          </div>
          <motion.p
            variants={childVariant}
            className="text-lg text-slate-300-300 font-poppins max-w-2xl mx-auto">
            Experience the future of AI with our cutting-edge features designed
            for modern applications
          </motion.p>
        </motion.div>
        <motion.div
          variants={containerVariant}
          viewport={{ once: true, amount: 0.2 }}
          initial="hidden"
          animate={isMobile ? "visible" : undefined}
          whileInView={isMobile ? undefined : "visible"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Features.map((feature, index) => {
            const direction = isMobile ? "middle":
              index % 3 === 0 ? "left" : index % 3 === 1 ? "middle" : "right";
            return (
              <motion.div
                variants={cardVariants}
                key={index}
                custom={direction}
                className="group relative p-8 rounded-2xl
                         bg-slate-800/40 backdrop-blur-md
                         border border-purple-400/20
                         hover:border-cyan-400/80 transition-all duration-300
                         hover:scale-105 hover:shadow-2xl  hover:shadow-cyan-500/40"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(147,51,234,0.08) 50%, rgba(59,130,246,0.08) 100%)",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}>
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

                <div className="relative z-10">
                  {/* Image */}
                  <div className="w-24 h-24 mb-6 mx-auto flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-purple-900/40  border border-purple-400/30 group-hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-110 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Title with gradient */}
                  <h3 className="text-2xl font-bold font-Rajdhani mb-4 text-[#18d486]">
                    {feature.title}
                  </h3>
                  {/* Description with light gray */}
                  <p className="text-slate-300 font-poppins mb-6 leading-relaxed group-hover:text-slate-200 transition-colors">
                    {feature.description}
                  </p>

                  {/* Upgraded Button with moving gradient */}
                  <button
                    className="relative w-full font-Expo overflow-hidden rounded-lg px-5 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-500/30 cursor-pointer">
                    <span className="relative z-10">{feature.buttonText}</span>
                    {/* Moving gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default AdvanceFeatures;
