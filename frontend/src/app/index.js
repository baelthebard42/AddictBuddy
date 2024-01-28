import { configureStore } from "@reduxjs/toolkit";
import { authService } from "./services/authService";
import authSlice from "./slices/authSlice";

const Store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authService.middleware),
});

export default Store;
