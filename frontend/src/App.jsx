import React, { useState } from "react";
import AppRouter from "./routers/AppRouter";
import { AnimatePresence, motion } from "framer-motion";
import ResponsiveNav from "./components/nav/ResponsiveNav";

const App = () => {
  const [responsiveSideBar, setResponsiveSideBar] = useState(false);

  const toggleNavbar = () => {
    setResponsiveSideBar(!responsiveSideBar);
  };
  const closeNavBar = () => {
    setResponsiveSideBar(false);
  };
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-black via-slate-900 to-cyan-900">
      <AnimatePresence>
        {responsiveSideBar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeNavBar}
              className="md:hidden fixed inset-0 bg-black/70 z-[99]"></motion.div>

              <ResponsiveNav closeMenu={closeNavBar} />
          </>
          
        )}
      </AnimatePresence>
      <AppRouter toggleNavbar={toggleNavbar} />
    </div>
  );
};

export default App;
