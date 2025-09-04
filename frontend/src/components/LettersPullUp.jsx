import { motion, useInView } from "framer-motion";
import React from "react";

function LettersPullUp({ text, className,delay = 0 }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const pullupVariant = {
    initial: { y: "100%" , opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: { // Spelling theek ki
        delay: delay + i * 0.05,
        type: "spring",
        damping: 15,
        stiffness: 200,
      },
    }),
  };

  return (
    <div ref={ref} className="flex justify-center items-center flex-wrap">
      {text.split("").map((letter, i) => (
        <motion.span
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          custom={i}
          className={`font-extrabold font-Expo tracking-tight ${className}`}
        >
          {letter === " " ? <span>&nbsp;</span> : letter}
        </motion.span>
      ))}
    </div>
  );
}

export default LettersPullUp;