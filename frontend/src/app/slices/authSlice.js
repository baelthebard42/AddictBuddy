import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token ? token : null,
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
      localStorage.setItem("token", payload);
    },
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
