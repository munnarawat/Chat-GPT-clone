import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import chatbot from "../images/chatbot.png";
import security from "../images/Security.png";
import speed from "../images/Speed.png";
// STEP 1: Customize this array with your features.
const Features = [
    { 
        id: 'smart-chat', 
        title: 'Intelligent Conversations', 
        description: 'Our AI understands context, remembers past interactions, and provides human-like responses.', 
        media: chatbot 
    },
    { 
        id: 'code-gen', 
        title: 'Real-time Code Generation', 
        description: 'Generate complex code snippets in any language instantly. Perfect for developers looking for a speed boost.', 
        media: security 
    },
    { 
        id: 'data-analysis', 
        title: 'Advanced Data Analysis', 
        description: 'Upload your data and get instant insights, charts, and summaries with our powerful analysis tools.', 
        media: speed 
    },
];

// Helper component for a single card
const FeatureCard = ({ feature, i, progress, range }) => {
    // useTransform hook scroll progress ko opacity aur scale mein convert karega
    const opacity = useTransform(progress, range, [0, 1, 1, 0]);
    const scale = useTransform(progress, range, [0.8, 1, 1, 0.8]);

    return (
        <motion.div 
            style={{ opacity, scale }}
            className="w-full h-full flex flex-col items-center justify-center text-center p-8
                       bg-gradient-to-br from-purple-900/30 to-slate-900/50
                       border border-cyan-400/20 rounded-2xl shadow-2xl shadow-cyan-500/10"
        >
            <div className="w-full h-3/4 flex items-center justify-center">
               <img src={feature.media} alt={feature.title} className="max-w-full max-h-full object-contain rounded-lg" />
            </div>
            <h3 className="text-3xl font-bold mt-6 mb-4">{feature.title}</h3>
            <p className="text-slate-300 max-w-md mx-auto">{feature.description}</p>
        </motion.div>
    );
};

// Main component
const Cards = () => {
    const targetRef = useRef(null);
    // useScroll hook scroll progress ko track karega
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end'] // Animation start se end tak chalega
    });

    return (
        <section ref={targetRef} className="relative w-full h-[300vh] bg-slate-900">
            {/* Yeh div screen par chipka rahega */}
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
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
            </div>
        </section>
    );
};

export default Cards;