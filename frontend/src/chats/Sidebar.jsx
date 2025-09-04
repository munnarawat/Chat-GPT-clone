import { motion } from "framer-motion";
import React from "react";
import NavSettings from "./NavSettings";

const Sidebar = ({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  userInfo,
  settingOpen,
  settingsClose,
  ToggleSettings,
  handleLogout,
}) => {
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="hidden md:flex flex-col font-poppins w-64 bg-slate-900 border-r border-slate-700/50 relative ">
      <div className="mb-6 p-4">
        <h2 className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4">
          Chat History
        </h2>
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg
                     bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold
                     hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-cyan-500/20">
          + New Chat
        </button>
      </div>
      <div className="flex-1 scrlbar overflow-y-auto p-4">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              onClick={() => onSelectChat(chat.id)}
              key={chat.id}
              className={`p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 group relative
                 ${
                   activeChatId === chat.id
                     ? " bg-gradient-to-r from-purple-900/40 to-slate-900 border-l-2 border-cyan-400 text-white "
                     : " text-slate-400 hover:bg-slate-800/60 hover:text-white   "
                 }
              `}>
              <div className="flex items-center space-x-2">
                <span>{chat.title || "Untitled Chat"}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center p-4">
            No chats available. Create a new chat to get started.
          </div>
        )}
      </div>
      {/* sideSettings */}
      <div className=" absolute  w-full bottom-15 ">
        <NavSettings
          userInfo={userInfo}
          settingOpen={settingOpen}
          handleLogout={handleLogout}
        />
      </div>
      <div
        onClick={() => ToggleSettings()}
        className="nav-footer w-full border-t border-gray-600/40  py-2 px-2 ">
        <div className=" bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer p-2 rounded-lg flex items-center gap-3 ">
          <div
            className="person-initials w-9 h-9 flex items-center justify-center
                          bg-gradient-to-br from-cyan-400 to-emerald-400
                          text-slate-900 font-bold rounded-full border-2 border-slate-900">
            {userInfo.fullName && userInfo.fullName.firstName[0].toUpperCase()}
            {userInfo.fullName && userInfo.fullName.lastName[0].toUpperCase()}
          </div>
          <div className="flex-1 truncate">
            <h2 className="font-bold text-sm text-slate-200 leading-tight">
              {userInfo.fullName && userInfo.fullName.firstName}{" "}
              {userInfo.fullName && userInfo.fullName.lastName}
            </h2>
            <span className="text-xs text-slate-400 ">Free</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
