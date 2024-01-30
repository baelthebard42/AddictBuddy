import { createSlice } from "@reduxjs/toolkit";

const normalConversation = JSON.parse(
  localStorage.getItem("normalConversation")
);
const relapseConversation = JSON.parse(
  localStorage.getItem("relapseConversation")
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    relapse: false,
    normalConversation: normalConversation ? normalConversation : [],
    relapseConversation: relapseConversation ? relapseConversation : [],
  },
  reducers: {
    setNormalConversation: (state, { payload }) => {
      state.normalConversation = payload;
      localStorage.setItem(
        "normalConversation",
        JSON.stringify(state.normalConversation)
      );
    },
    deleteNormalConversation: (state) => {
      state.normalConversation = [];
      localStorage.removeItem("normalConversation");
    },
    setRelapseConversation: (state, { payload }) => {
      state.relapseConversation = payload;
      localStorage.setItem(
        "relapseConversation",
        JSON.stringify(state.relapseConversation)
      );
    },
    deleteRelapseConversation: (state) => {
      state.relapseConversation = [];
      localStorage.removeItem("relapseConversation");
    },
    relapseOn: (state) => {
      state.relapse = true;
    },
    relapseOff: (state) => {
      state.relapse = false;
    },
  },
});

export const {
  setNormalConversation,
  deleteNormalConversation,
  setRelapseConversation,
  deleteRelapseConversation,
  relapseOn,
  relapseOff,
} = conversationSlice.actions;
export default conversationSlice.reducer;
