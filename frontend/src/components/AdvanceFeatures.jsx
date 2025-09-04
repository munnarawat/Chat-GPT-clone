import React from "react";
import brain from "../../src/images/brain.png";
import multiLang from "../../src/images/Multi-lang.png";
import security from "../../src/images/Security.png";
import speed from "../../src/images/Speed.png";
import chatbot from "../../src/images/chatbot.png";

const AdvanceFeatures = ({Features}) => {
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-Expo mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Advanced Features
            </span>
          </h2>
          <p className="text-lg text-slate-300-300 font-poppins max-w-2xl mx-auto">
            Experience the future of AI with our cutting-edge features designed
            for modern applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl
                         bg-slate-800/40 backdrop-blur-md
                         border border-purple-400/20
                         hover:border-cyan-400/60 transition-all duration-300
                         hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(147,51,234,0.08) 50%, rgba(59,130,246,0.08) 100%)",
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}>
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-4xl bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

              <div className="relative z-10">
                {/* Image */}
                <div
                  className="w-24 h-24 mb-6 mx-auto flex items-center justify-center rounded-xl 
                                bg-gradient-to-br from-slate-900 to-purple-900/40 
                                border border-purple-400/30
                                group-hover:border-cyan-400/50 transition-all duration-300
                                group-hover:scale-110 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Title with gradient */}
                <h3 className="text-xl font-bold font-sora-semibolditalic mb-4 text-slate-100">
                  {feature.title}
                </h3>
                {/* Description with light gray */}
                <p className="text-slate-300 mb-6 leading-relaxed group-hover:text-slate-200 transition-colors">
                  {feature.description}
                </p>

                {/* Upgraded Button with moving gradient */}
                <button
                  className="relative w-full overflow-hidden rounded-lg px-5 py-3
                                   bg-gradient-to-r from-cyan-500 to-emerald-500
                                   text-slate-900 font-bold
                                   transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-500/30">
                  <span className="relative z-10">{feature.buttonText}</span>
                  {/* Moving gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvanceFeatures;
