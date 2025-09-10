import instagram from "../images/instagram.webp";
import x from "../images/x.webp";
import github from "../images/github.webp";
import linkedin from "../images/linkedin.webp";
import LettersPullUp from "../animation/LettersPullUp";
import { motion } from "framer-motion";

const Footer = () => {
  const footerData = [
    { url: instagram, socialLink: "https://www.instagram.com/munna.rawat26/" },
    { url: x, socialLink: "https://x.com/MunnaRa28967550" },
    { url: github, socialLink: "https://github.com/munnarawat" },
    {
      url: linkedin,
      socialLink: "https://www.linkedin.com/in/manoj-singh-rawat-3062a4268",
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
  const iconVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  return (
    <footer className="w-full relative overflow-hidden py-10 text-center aurora-background">
      <motion.div
        className="w-full max-w-md mx-auto h-[1px] bg-gradient-to-r from-transparent  to-transparent mb-10"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      />
      {/* title-name */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full  overflow-hidden py-10 ">
        <LettersPullUp
          text="MINDORA"
          className="shimmer-text text-[4.5rem] sm:text-[8rem] lg:text-[14rem] bg-gradient-to-b from-fuchsia-500 via-purple-600 to-cyan-400 bg-clip-text text-transparent"
        />
      </motion.div>
      <motion.div
        className="w-full flex gap-4 items-center justify-center"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        {footerData.map((items, index) => (
          <motion.a
            key={index}
            href={items.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            variants={iconVariants}
            whileHover={{ y: -5, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <img
              src={items.url}
              alt=""
              width="36"
              height="36"
              loading="lazy"
              className=" cursor-pointer neon-glow"
            />
          </motion.a>
        ))}
      </motion.div>
      <p className="text-sm md:text-base mt-8 text-zinc-600 font-mono dark:text-zinc-400">
        © {new Date().getFullYear()} MinDora . Features by Manoj Singh Rawat
      </p>
    </footer>
  );
};

export default Footer;
