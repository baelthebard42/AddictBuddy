import { createSlice } from "@reduxjs/toolkit";

const token = JSON.parse(localStorage.getItem("token"));
const user = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user ? user : null,
    token: token ? token : null,
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
      localStorage.setItem("token", JSON.stringify(payload));
    },
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    setUser: (state, { payload }) => {
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },
    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setToken, removeToken, setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
