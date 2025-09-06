import Footer from "../components/Footer";
import brain from "../../src/images/brain.png";
import multiLang from "../../src/images/Multi-lang.png";
import security from "../../src/images/Security.png";
import speed from "../../src/images/Speed.png";
import chatbot from "../../src/images/chatbot.png";
import {  useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import AdvanceFeatures from "../components/AdvanceFeatures";
import HowWok from "../components/HowWok";
import { useSelector } from "react-redux";
import Cards from "../components/Cards";
const Home = () => {
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
    <div className="min-h-screen  bg-white   bg-gradient-to-br from-black via-slate-900 to-cyan-900">
      {/* Hero Section */}
      <Hero handleGetStarted={handleGetStarted}/>
      {/* Futuristic Features Section */}
      <AdvanceFeatures/>
      <Cards/>
      {/* How It Works Section */}
      <HowWok/>
      <Footer />
    </div>
  );
};

export default Home;
