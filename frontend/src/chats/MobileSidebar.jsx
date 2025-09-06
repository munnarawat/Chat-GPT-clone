import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { HiX } from "react-icons/hi";
import NavSettings from "./NavSettings";

const MobileSidebar = ({
  isOpen,
  onClose,
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  userInfo,
  settingOpen,
  ToggleSettings,
  handleLogout,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -600 }}
          animate={{ x: 0 }}
          exit={{ x: -600 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="lg:hidden fixed font-poppins left-0 top-0 h-full w-[65%] sm:w-[50%] md:w-[40%] bg-slate-900 border-r border-slate-700/50  z-50">
          <div className="p-4">
            <div className="flex   items-center justify-between mb-6 ">
              <h2 className="text-cyan-400   font-bold tracking-widest uppercase mb-4">
                Chat History
              </h2>
              <button
                onClick={onClose}
                className="p-1 text-gray-400 cursor-pointer hover:text-green-400 transition-colors">
                <HiX size={20} />
              </button>
            </div>
            <button
              onClick={() => onNewChat()}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg
                     bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold
                     hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-cyan-500/20">
              + New Chat
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto scrlbar h-[calc(100vh-210px)]">
            {chats && chats.length > 0 ? (
              chats.map((chat,index) => (
                <div
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className={`p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 group relative
                 ${
                   activeChatId === chat.id
                     ? " bg-gradient-to-r from-purple-900/40 to-slate-900 border-l-2 border-cyan-400 text-white"
                     : " text-slate-400 hover:bg-slate-800/60 hover:text-white "
                 }
              `}>
                  <div className="flex items-center space-x-2">
                    <span>{chat.title}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center p-4">
                No chats available. Create a new chat to get started.
              </div>
            )}
          </div>
          <div className=" absolute  w-full bottom-20  ">
            <NavSettings
              userInfo={userInfo}
              settingOpen={settingOpen}
              handleLogout={handleLogout}
            />
          </div>
          <div
            onClick={() => ToggleSettings()}
            className="nav-footer w-full border-t border-gray-600/40 py-2  px-3 ">
            <div className=" bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer p-2 rounded-lg flex items-center gap-3 ">
              <div
                className="person-initials w-9 h-9 flex items-center justify-center
                          bg-gradient-to-br from-cyan-400 to-emerald-400
                          text-slate-900 font-bold rounded-full border-2 border-slate-900">
                {userInfo.fullName &&
                  userInfo.fullName.firstName[0].toUpperCase()}
                {userInfo.fullName &&
                  userInfo.fullName.lastName[0].toUpperCase()}
              </div>
              <div className="flex-1 truncate">
                <h2 className="font-bold text-sm text-slate-200 leading-tight">
                  {userInfo.fullName && userInfo.fullName.firstName}{" "}
                  {userInfo.fullName && userInfo.fullName.lastName}
                </h2>
                <span className="text-xs text-slate-400">Free</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
