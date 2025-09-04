import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { IoHelpBuoy } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
const NavSettings = ({ userInfo, settingOpen,handleLogout }) => {
  const data = [
    { icons: <FaCrown />, title: "UpgragePlan" },
    { icons: <VscSettings />, title: "Customize MinDora" },
    { icons: <IoSettingsOutline />, title: "Settings" },
  ];
  const userSettings = [
    { icons: <IoHelpBuoy />, title: "Help",action: ()=>{console.log("clicked help");
    } },
    { icons: <IoIosLogOut />, title: "Log Out" ,action: handleLogout },
  ];
  return (
    <div>
      {settingOpen && (
        <motion.div className="w-full font-gilroy  bg-gradient-to-br from-slate-900 to-emerald-950 border border-slate-700 rounded-2xl p-3">
          <div className="w-full">
            <div className="group flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 p-1 transition-all duration-300 ease-in-out hover:bg-white/10 hover:translate-x-2">
              <span className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-300">
                <FaRegUserCircle />
              </span>
              <h2 className="text-slate-300 group-hover:text-white transition-colors duration-300">
                {userInfo.email}
              </h2>
            </div>
            {data.map((item, index) => (
              <div
                key={index}
                className="group mt-2 flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 p-1 transition-all duration-300 ease-in-out hover:bg-white/10 hover:translate-x-2">
                <span className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-300">
                  {item.icons}
                </span>
                <h2 className="text-slate-300 group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h2>
              </div>
            ))}
            <hr className="text-gray-600/70 mt-1" />
            {/* log-out */}
            {userSettings.map((item, index) => (
              <div
                key={index}
                onClick={item.action}
                className="group mt-2 flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 p-1 transition-all duration-300 ease-in-out hover:bg-white/10 hover:translate-x-2">
                <span className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-300">
                  {item.icons}
                </span>
                <h2 className="text-slate-300 group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h2>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NavSettings;
