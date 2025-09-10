import React, { useState } from "react";
import { motion } from "framer-motion";
import LettersPullUp from "../animation/LettersPullUp";

// Checkmark Icon
const CheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}>
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
      clipRule="evenodd"
    />
  </svg>
);

const PriceSection = ({handleGetStarted}) => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "For individuals getting started with our basic tools.",
      features: [
        "Some limited features only",
        "400 messaging limits",
        "Limited Projects",
        "20,000 Words",
      ],
      isPopular: false,
      glowColor: "#38bdf8",
      action: handleGetStarted,
    },
    {
      name: "Plus plan",
      price: { monthly: 20, yearly: 192 }, // Yearly price = 20 * 12 * 0.8 (20% off)
      description: "For creators and professionals who need more power.",
      features: [
        "Everything in Free",
        "2000 messaging limits",
        "Unlimited Projects",
        "Open AI Key integration",
        "100,000 Words",
      ],
      isPopular: true,
      glowColor: "#a855f7",
      action: ()=> console.log("Plus plan")
      
    },
    {
      name: "Pro plan",
      price: { monthly: 30, yearly: 288 }, // Yearly price = 30 * 12 * 0.8 (20% off)
      description: "For power users who need the full suite of features.",
      features: [
        "Everything in Plus plan",
        "5000 messaging limits",
        "Unlimited Projects",
        "Open AI Key integration",
        "1,000,000 Words",
      ],
      isPopular: false,
      glowColor: "#f59e0b",
      action: ()=> console.log("pro plan")
      
    },
  ];

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.4 },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section className="px-7 lg:px-20 py-24  font-poppins ">
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="text-center">
        <div className="text-3xl font-bold font-Expo sm:text-5xl lg:text-6xl">
          <LettersPullUp
            text="Start Your Journey"
            className="bg-gradient-to-b from-fuchsia-500 via-purple-600 to-cyan-400 bg-clip-text text-transparent"
          />
        </div>
        <motion.p variants={cardVariant} className="mt-4  max-w-2xl mx-auto">
          Unlock the Potential of Innovation. Discover the Advanced AI Tools
          Transforming Your Ideas into Reality.
        </motion.p>
        <div className="mt-12 flex justify-center">
          <div className="bg-zinc-800/60 backdrop-blur-sm border border-fuchsia-400/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 rounded-full p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-3 text-sm font-semibold rounded-full transition-colors ${
                !isYearly
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/40"
                  : "text-zinc-400 hover:bg-zinc-700/40"
              }`}>
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-3 text-sm font-semibold rounded-full transition-colors ${
                isYearly
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/40"
                  : "text-zinc-100 hover:bg-zinc-700/40"
              }`}>
              Annually <span className="hidden sm:inline">(Save 20%)</span>
            </button>
          </div>
        </div>
      </motion.div>
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-20 grid  grid-cols-1 hover:shadow-glow md:grid-cols-2 lg:grid-cols-3 gap-14 lg:gap-10 max-w-6xl mx-auto">
        {plans.map((plan) => (
          //  console.log(`Plan: ${plan.name}, Glow Color: ${plan.glowColor}`)
          <motion.div
            key={plan.name}
            variants={cardVariant}
            style={{ "--glow-color": plan.glowColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 25px 0 ${plan.glowColor}`;
              e.currentTarget.style.borderColor =`${plan.glowColor}`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "";
              e.currentTarget.style.borderColor =""
            }}
            className={`relative   hover:-translate-y-10  duration-300  p-8 rounded-xl shadow-2xl  backdrop-blur-lg border border-zinc-600/40`}>
            {plan.isPopular && (
              <span className="absolute top-4 right-4 bg-[#9810FA] text-white text-xs font-semibold px-3 py-1 rounded-full">
                Popular
              </span>
            )}
            <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">
                {`$${isYearly ? plan.price.yearly / 12 : plan.price.monthly}`}
              </span>
              <span className="text-zinc-400">/ per month</span>
            </div>

            <p className="mt-4 text-zinc-400 text-sm h-10">
              {plan.description}
            </p>
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-emerald-500" />
                  <span className="text-zinc-300">{feature}</span>
                </li>
              ))}
            </ul>
            <motion.button
             onClick={plan.action}
              whileTap={{ scale: 0.8 }}
              className={`w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900  mt-8 font-Orbitron py-3 px-6 text-base font-semibold rounded-full overflow-hidden border-white/20 transition-all transform hover:scale-105 border ${
                // Hover effect updated
                plan.isPopular
                  ? " backdrop-blur-md text-white shadow-lg" // Popular button with gradient and stronger shadow
                  : " backdrop-blur-md  text-white hover:bg-white/20"
              }`}>
              {plan.name === "Free" ? "Try it for Free" : "Purchase Now"}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PriceSection;
