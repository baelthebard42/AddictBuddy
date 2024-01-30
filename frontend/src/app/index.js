import { configureStore } from "@reduxjs/toolkit";
import { authService } from "./services/authService";
import authSlice from "./slices/authSlice";
import conversationSlice from "./slices/conversationSlice";
import { chatService } from "./services/chatService";

const Store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    authSlice,
    [chatService.reducerPath]: chatService.reducer,
    conversationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authService.middleware)
      .concat(chatService.middleware),
});

export default Store;
