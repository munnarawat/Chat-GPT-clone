import { createSlice, nanoid } from "@reduxjs/toolkit";

// helpers
const createEmptyChat = (title) => ({
  id: nanoid(),
  title: title || "new Chat",
  messages: [],
});

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    activeChatId: null,
    isSending: false,
    input: "",
  },
  reducers: {
    ensureInitialChat(state) {
      if (state.chats.length === 0) {
        const chat = createEmptyChat();
        state.chats.unshift(chat);
        state.activeChatId = chat.id;
      }
    },
    startNewChat: {
      reducer(state, action) {
        const { id, title } = action.payload;
        state.chats.unshift({ id, title: title || "new Chat", messages: [] });
        state.activeChatId = id;
      },
    },
    selectChat(state, action) {
      state.activeChatId = action.payload;
    },
    setInput(state, action) {
      state.input = action.payload;
    },
    sendingStarted(state) {
      state.isSending = true;
    },
    sendingFinished(state) {
      state.isSending = false;
    },
    setChats(state, action) {
      state.chats = action.payload;
    },
    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      const chatIndex = state.chats.findIndex(chat => chat.id === chatId);
      if (chatIndex !== -1) {
        state.chats[chatIndex].messages = messages;
      }
    },
    addUserMessage: {
      reducer(state, action) {
        const { chatId, message } = action.payload;
        const chat = state.chats.find((c) => c.id === chatId);
        if (!chat) return;
        if (chat.messages.length === 0) {
          chat.title =
            message.content.slice(0, 40) +
            (message.content.length > 40 ? "..." : "");
        }
        chat.messages.push(message);
      },
    },
    addAiMessage: {
      reducer(state, action) {
        const { chatId, message } = action.payload;
        const chat = state.chats.find((c) => c.id === chatId);
        if (!chat) return;
        chat.messages.push(message);
      },
    },
  },
});

export const {
  ensureInitialChat,
  startNewChat,
  selectChat,
  setInput,
  sendingStarted,
  sendingFinished,
  setChats,
  addUserMessage,
  setMessages,
  addAiMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
