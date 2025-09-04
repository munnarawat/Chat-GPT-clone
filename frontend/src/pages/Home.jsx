import Footer from "../components/Footer";
import brain from "../../src/images/brain.png";
import multiLang from "../../src/images/Multi-lang.png";
import security from "../../src/images/Security.png";
import speed from "../../src/images/Speed.png";
import chatbot from "../../src/images/chatbot.png";
import { Link, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import AdvanceFeatures from "../components/AdvanceFeatures";
import HowWok from "../components/HowWok";
import { useSelector } from "react-redux";
import Navbar from "../components/nav/Navbar";


const Home = () => {
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
  const {user} = useSelector((state)=>state.auth)

  const navigate = useNavigate();
  const handleGetStarted = () => {
    if(user){
      navigate("/chats");
    }else{
      navigate('/login')
    }
    
  };
  return (
    <div className="min-h-screen  bg-white   bg-gradient-to-br from-black via-slate-800-900 to-cyan-900">
      <Navbar />
      {/* Hero Section */}
      <Hero handleGetStarted={handleGetStarted}/>
      {/* Futuristic Features Section */}
      <AdvanceFeatures Features={Features}/>
      {/* <Cards/> */}
      {/* How It Works Section */}
      <HowWok/>
      <Footer />
    </div>
  );
};

export default Home;
