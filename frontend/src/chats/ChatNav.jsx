import { FiEdit } from "react-icons/fi";
import { HiOutlineMenuAlt2, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const ChatNav = ({ toggleSidebar, onNewChat }) => {
  return (
    <div className="flex items-center justify-between py-3 px-4 bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
      <div className="flex items-center gap-2">
        <button
          onClick={() => toggleSidebar()}
          className="flex lg:hidden text-2xl cursor-pointer text-slate-400 hover:text-cyan-400 transition-colors">
          <HiOutlineMenuAlt2 />
        </button>
        <Link to="/" className="logo-chat w-20">
          <img className="w-full object-contain " src={logo} alt="" />
        </Link>
      </div>
      <button
        onClick={onNewChat}
        className="flex items-center gap-2 py-2 px-4 rounded-lg
                   bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold
                   hover:opacity-90 cursor-pointer active:scale-95 transition-all duration-200 shadow-lg shadow-cyan-500/20">
        <span className="text-lg">
          <FiEdit />
        </span>
        New Chat
      </button>
    </div>
  );
};

export default ChatNav;
