import { configureStore } from "@reduxjs/toolkit";
import chatReducer from './reducer/chatSlice'
import authReducer from './reducer/authSlice'
export const store = configureStore({
  reducer: {
    chat: chatReducer,
    auth:authReducer,
  }
});
