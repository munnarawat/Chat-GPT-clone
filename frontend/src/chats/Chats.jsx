import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { io } from "socket.io-client";
import { BsSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  selectChat,
  startNewChat,
  setInput,
  sendingFinished,
  sendingStarted,
  addAiMessage,
  addUserMessage,
  setChats,
  setMessages,
} from "../store/reducer/chatSlice";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import ChatNav from "./ChatNav";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats || []);
  const input = useSelector((state) => state.chat.input || "");
  const isSending = useSelector((state) => state.chat.isSending);
  const activeChatId = useSelector((state) => state.chat.activeChatId);
  const [socket, setSocket] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const navigate =  useNavigate()

  // Get messages for current active chat
  const currentChat = useSelector((state) =>
    state.chat.chats?.find((chat) => chat.id === activeChatId)
  );
  const messages = currentChat?.messages || [];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const textareaRef = useRef(null);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load chats on component mount
  useEffect(() => {
    const loadChats = async () => {
      try {
        const response = await axios.get("https://mindora-f1yl.onrender.com/api/chat", {
          withCredentials: true,
        });
        const chatsData = Array.isArray(response.data.chats)
          ? response.data.chats
          : [];
        dispatch(setChats(chatsData));

        // Auto-select first chat if no active chat
        if (chatsData.length > 0 && !activeChatId) {
          dispatch(selectChat(chatsData[0].id));
          await getMessage(chatsData[0].id);
        }
      } catch (error) {
        console.error("Failed to load chats:", error);
        dispatch(setChats([]));
      }
    };

    loadChats();
  }, []);
  // Socket.IO connection
  useEffect(() => {
    const newSocket = io("https://mindora-f1yl.onrender.com", {
      withCredentials: true,
      transports: ["websocket", "polling"],
      timeout: 20000,
    });

    newSocket.on("connect", () => {
      setSocket(newSocket);
    });

    // listen for ai response
    newSocket.on("ai-response", (data) => {
      // console.log("AI response received:", data);
      dispatch(
        addAiMessage({
          chatId: data.chat,
          message: {
            type: "ai",
            content: data.content,
            timestamp: new Date().toISOString(),
          },
        })
      );
      dispatch(sendingFinished());
    });

    newSocket.on("error", (error) => {
      console.error("Socket error:", error);
      dispatch(sendingFinished());
    });

    return () => newSocket.close();
  }, []);
  // Handle message sending
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    if (!activeChatId) {
      alert("Please select or create a chat first");
      return;
    }

    const messageText = input.trim();

    // Add user message
    const userMessage = {
      type: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    };
    dispatch(
      addUserMessage({
        chatId: activeChatId,
        message: userMessage,
      })
    );

    // Start sending state
    dispatch(sendingStarted());

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
    }
    dispatch(setInput(""));

    try {
      // Save user message to database first
      const response = await axios.post(
        `https://mindora-f1yl.onrender.com/api/chat/messages/${activeChatId}`,
        {
          message: messageText,
          timestamp: new Date().toISOString(),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Message saved to database:", response.data);

      // Send message via socket to backend for AI processing
      if (socket) {
        socket.emit("ai-message", {
          chat: activeChatId,
          content: messageText,
        });
      } else {
        console.error("Socket not connected");
        dispatch(sendingFinished());
        alert("Connection lost. Please refresh the page.");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      dispatch(sendingFinished());
      alert("Failed to send message. Please try again.");
      dispatch(setInput(messageText));
    }
  };
  // Fetch messages from backend
  const getMessage = async (chatId) => {
    try {
      const response = await axios.get(
        `https://mindora-f1yl.onrender.com/api/chat/messages/${chatId}`,
        { withCredentials: true }
      );
      // console.log("fetching messages:", response.data,messages);
      const messagesData =
        response.data.messages?.map((msg) => ({
          type: msg.role === "user" ? "user" : "ai",
          content: msg.content,
          timestamp: msg.createdAt || new Date().toISOString(),
        })) || [];

      dispatch(
        setMessages({
          chatId: chatId,
          messages: messagesData,
        })
      );
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };
  //  get username fetch
  const GetUserName = async () => {
    try {
      const response = await axios.get("https://mindora-f1yl.onrender.com/api/auth/user", {
        withCredentials: true,
      });
      setUserInfo(response.data.user);
    } catch (error) {
      console.log("user not fetched:", error);
    }
  };
  useEffect(() => {
    GetUserName();
  }, []);
  // Handle new chat creation
  const handleNewChat = async () => {
    let chatTitle = prompt("Enter a title for new chat:", "");
    if (chatTitle) chatTitle = chatTitle.trim();
    if (!chatTitle) return;

    try {
      const response = await axios.post(
        "https://mindora-f1yl.onrender.com/api/chat",
        { title: chatTitle },
        { withCredentials: true }
      );

      console.log("New chat created:", response.data.chat);

      // Add new chat to Redux with correct id field
      const newChat = {
        ...response.data.chat,
        _id: response.data.chat.id, // Map id to _id for Redux
        messages: [],
      };

      dispatch(startNewChat(newChat));
      dispatch(selectChat(response.data.chat.id));

      // Initialize empty messages for new chat
      dispatch(
        setMessages({
          chatId: response.data.chat.id,
          messages: [],
        })
      );
    } catch (error) {
      console.error("New chat creation failed:", error);
      alert("Failed to create new chat. Please try again.");
    }
  };
  // Handle chat selection
  const handleSelectChat = async (chatId) => {
    // console.log("Selecting chat:", chatId);
    dispatch(selectChat(chatId));
    await getMessage(chatId);
    setIsSidebarOpen(false);
  };
//   handleLogout
  const handleLogout = async ()=> {
     try {
       await axios.post("https://mindora-f1yl.onrender.com/api/auth/logOut",{}, {withCredentials:true})
       console.log("logOut succefully");
       navigate('/login')
       
     } catch (error) {
       console.log("Logout failed", error);
       
     }
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  // settings-toggle
  const ToggleSettings = () => {
    setSideNavOpen(!sideNavOpen);
  };
  const closeSettings = () => {
    setSideNavOpen(false);
  };

  return (
    <div className="flex h-[100dvh] bg-gradient-to-br from-slate-900 via-black to-purple-900/20 overflow-hidden">
      {/* mobile overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="lg:hidden fixed inset-0 bg-black/50 z-40">
            </motion.div>
        )}
      </AnimatePresence>
      {/* Sidebar -desktop-view */}
      <Sidebar
        chats={chats}
        userInfo={userInfo}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        settingOpen={sideNavOpen}
        settingsClose={closeSettings}
        ToggleSettings={ToggleSettings}
        handleLogout={handleLogout}
      />
      {/* mobile-sidebar */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        userInfo={userInfo}
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        settingOpen={sideNavOpen}
        settingsClose={closeSettings}
        ToggleSettings={ToggleSettings}
        handleLogout={handleLogout}
      />
      {/* Main Chat Area */}
      <div className="w-full flex flex-col">
        {/* chat-nav-bar */}
        <ChatNav toggleSidebar={toggleSidebar} onNewChat={handleNewChat} />
        {/* Chat Messages */}
        <ChatMessage isSending={isSending} messages={messages} activeChatId={activeChatId} />
        {/* Input Area */}
        <ChatInput
          input={input}
          activeChatId={activeChatId}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          isSending={isSending}
          textareaRef={textareaRef}
        />
      </div>
    </div>
  );
};

export default Chats;
