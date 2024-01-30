import { configureStore } from "@reduxjs/toolkit";
import { authService } from "./services/authService";
import authSlice from "./slices/authSlice";
import conversationSlice from "./slices/conversationSlice";
import { botService } from "./services/botService";

const Store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    authSlice,
    [botService.reducerPath]: botService.reducer,
    conversationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authService.middleware)
      .concat(botService.middleware),
});

export default Store;
