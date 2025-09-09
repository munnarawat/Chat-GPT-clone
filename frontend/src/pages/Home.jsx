import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import AdvanceFeatures from "../components/AdvanceFeatures";
import HowWok from "../components/HowWok";
import { useSelector } from "react-redux";
import Cards from "../components/Cards";
import PriceSection from "../components/PriceSection";
import { useEffect } from "react";
import { Element, scroller } from "react-scroll";
const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      let elem = location.hash.slice(1);
      scroller.scrollTo(elem, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -70, // Navbar ki height ke liye offset
      });
    }
  }, [location]);
  const handleGetStarted = () => {
    if (user) {
      navigate("/chats");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="min-h-screen  bg-white   bg-gradient-to-br from-black via-slate-900 to-cyan-900">
      {/* Hero Section */}
      <Hero handleGetStarted={handleGetStarted} />
      {/* Futuristic Features Section */}
      <Element name="features">
        <AdvanceFeatures />
      </Element>
      <Cards />
      {/* How It Works Section */}
      <div className="w-full bg-gradient-to-br from-black via-slate-900 to-cyan-900">
        <Element name="howitworks">
          <HowWok />
        </Element>
        {/* plan */}
        <Element name="pricing">
          <PriceSection />
        </Element>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
