import React from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

// POLISH 3: Typing Indicator ko "Glow Up"
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center space-x-3"
  >
    <div className="w-10 h-10 rounded-full bg-slate-700 flex-shrink-0"></div>
    <div className="flex items-center space-x-2 p-4 bg-slate-800/50 rounded-2xl">
      <motion.div
        className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_6px_theme(colors.cyan.400)]"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_6px_theme(colors.cyan.400)]"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />
      <motion.div
        className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_6px_theme(colors.cyan.400)]"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
    </div>
  </motion.div>
);

const ChatMessage = ({ messages, activeChatId, isSending }) => {
  return (
    <div className="flex-1 overflow-y-auto scrlbar p-4">
      <div className="space-y-6"> {/* Thoda sa vertical space badhaya */}
        {messages.map((message) => (
          <motion.div
            // POLISH 4: Using a unique message ID for the key
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl border ${
                message.type === "user"
                  // POLISH 1: User message with cyan gradient, border, and glow
                  ? "bg-gradient-to-br from-cyan-900/40 to-cyan-900/10 border-cyan-400/20 text-cyan-200 ml-auto shadow-lg shadow-cyan-500/10"
                  // POLISH 1: AI message with purple gradient, border, and glow
                  : "bg-gradient-to-br from-purple-900/30 to-purple-900/10 border-purple-400/20 text-purple-200 mr-auto shadow-lg shadow-purple-500/10"
              }`}
            >
              <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                  p: ({ node, ...props }) => <p {...props} className="prose max-w-none prose-invert mb-4 last:mb-0" />,
                  code: ({ node, inline, ...props }) =>
                    inline ? (
                      <code {...props} className="bg-slate-700/50 px-1.5 py-0.5 rounded text-cyan-300 text-sm" />
                    ) : (
                      // POLISH 2: Code blocks ko aur stylish banaya
                      <pre className="bg-slate-900/50 border border-slate-700/80 p-3 my-4 rounded-lg overflow-x-auto text-sm">
                        <code {...props} className="text-cyan-200" />
                      </pre>
                    ),
                }}
              >
                {message.content}
              </ReactMarkdown>
              <span className="text-xs text-slate-400 mt-2 block text-right">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </motion.div>
        ))}

        {isSending && <TypingIndicator />}

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