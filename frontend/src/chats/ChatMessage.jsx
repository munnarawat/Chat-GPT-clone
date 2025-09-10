import  { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { IoCopyOutline } from "react-icons/io5";
import robot from '../images/robot.webp'
// POLISH 3: Typing Indicator ko "Glow Up"
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center space-x-3">
    <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden flex-shrink-0">
      <img className="w-full h-full object-cover" src={robot} alt="Chatbot" />
    </div>
    <div className="flex items-center space-x-2 p-4 bg-slate-800/50 rounded-2xl">
      <motion.div
        className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_6px_theme(colors.cyan.400)]"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_6px_theme(colors.cyan.400)]"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 1.0,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
      <motion.div
        className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_6px_theme(colors.cyan.400)]"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 1.0,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
    </div>
  </motion.div>
);

const ChatMessage = ({ messages, activeChatId, isSending }) => {
  const [copiedId, setCopiedId] = useState(null);
   const messagesEndRef = useRef(null);
    
  //  auto-scroll to bottom when messages change 
  useEffect(()=>{
    messagesEndRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages,isSending])
  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <div data-lenis-prevent className="flex-1 overflow-y-auto scrlbar p-4">
      <div className="space-y-6">
        {" "}
        {messages.map((message, index) => (
          <motion.div
            key={message.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}>
            <div
              className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl border break-words ${
                message.type === "user"
                  ?
                    "bg-gradient-to-br from-cyan-900/40 to-cyan-900/10 border-cyan-400/20 text-cyan-200 ml-auto shadow-lg shadow-cyan-500/10"
                  :
                    "bg-gradient-to-br from-purple-900/30 to-purple-900/10 border-purple-400/20 text-purple-200 mr-auto shadow-lg shadow-purple-500/10"
              }`}>
              <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                  p: ({ node, ...props }) => (
                    <div
                      {...props}
                      className="prose max-w-none prose-invert mb-4 last:mb-0"
                    />
                  ),
                  code: ({ node, inline, ...props }) =>
                    inline ? (
                      <code
                        {...props}
                        className="bg-slate-700/50 px-1.5 py-0.5 rounded text-cyan-300 text-sm"
                      />
                    ) : (
                      // POLISH 2: Code blocks ko aur stylish banaya
                      <pre className="bg-slate-900/50 border border-slate-700/80 p-3 my-4 rounded-lg overflow-x-auto text-sm">
                        <code {...props} className="text-cyan-200" />
                      </pre>
                    ),
                }}>
                {message.content}
              </ReactMarkdown>
              <span className="text-xs text-slate-400 mt-2 block text-right">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              {message.type !== "user" && (
                <button
                  onClick={() =>
                    handleCopy(message.content, message.id || index)
                  }
                  className="text-slate-400 cursor-pointer hover:text-cyan-400 transition-colors flex items-center space-x-1 text-sm">
                  <IoCopyOutline size={16} />
                  <span>
                    {copiedId === (message.id || index) ? "Copied!" : "Copy"}
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
        {isSending && <TypingIndicator />}
        {/* auto scroll */}
        <div ref={messagesEndRef}/>
        {messages.length === 0 && !isSending && (
          <div className="flex items-center justify-center h-[50vh]">
            <div className="text-center text-slate-500">
              <h3 className="text-xl mb-2 font-Orbitron">
                {activeChatId ? "A New Conversation" : "Welcome to MinDora"}
              </h3>
              <p className="max-w-xs text-sm">
                {activeChatId
                  ? "This chat is empty. Send a message to begin the magic!"
                  : "Select a chat from the sidebar or create a new one to get started."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
