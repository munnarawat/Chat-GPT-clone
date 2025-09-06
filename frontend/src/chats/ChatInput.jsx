import { motion } from "framer-motion";
import React from "react";
import { BsSendFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

const ChatInput = ({input, activeChatId, setInput, handleSendMessage,isSending,textareaRef}) => {
   const dispatch = useDispatch()
  return (
    <motion.form
      onSubmit={handleSendMessage}
      className=" p-4  backdrop-blur"
      initial={{ y: 50 }}
      animate={{ y: 0 }}>
      <div className="relative max-w-3xl  p-1 border border-gray-600 rounded-full overflow-hidden mx-auto flex items-center">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => {
            dispatch(setInput(e.target.value));
            // Auto adjust height
            e.target.style.height = "inherit";
            e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
          rows="1"
          placeholder="Ask anything..."
          className="w-full resize-none scrlbar  text-gray-100 py-3 px-6 pr-24 outline-none  transition-all duration-300 backdrop-blur-sm min-h-[50px] max-h-[150px] overflow-y-auto"
        />
        <button
          type="submit"
          disabled={!input.trim() || !activeChatId || isSending}
          className={`right-2 h-10 px-3 rounded-full bg-cyan-500/20 text-green-400 ${
            input.trim() && activeChatId && !isSending
              ? "cursor-pointer hover:bg-cyan-500/40"
              : "cursor-not-allowed opacity-50"
          } transition-all duration-300 flex items-center justify-center`}>
          <span>
            <BsSendFill />
          </span>
        </button>
      </div>
    </motion.form>
  );
};

export default ChatInput;
