import { createSlice } from "@reduxjs/toolkit";

const conversation = JSON.parse(localStorage.getItem("conversation"));

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversation: conversation ? conversation : [],
  },
  reducers: {
    setConversation: (state, { payload }) => {
      state.conversation = payload;
      localStorage.setItem("conversation", JSON.stringify(state.conversation));
    },
    deleteConversation: (state) => {
      state.conversation = [];
      localStorage.removeItem("conversation");
    },
  },
});

export const { setConversation, deleteConversation } =
  conversationSlice.actions;
export default conversationSlice.reducer;
