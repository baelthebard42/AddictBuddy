import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { removeToken, removeUser, setToken } from "../slices/authSlice";
import {
  deleteNormalConversation,
  deleteRelapseConversation,
} from "../slices/conversationSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().authSlice.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token.access}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    result.error.status === 401 &&
    result.error?.data?.code === "token_not_valid"
  ) {
    const refresh = api.getState().authSlice.token.refresh;
    const refreshResult = await fetch(
      "http://127.0.0.1:8000/api/token/refresh",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          refresh,
        }),
      }
    );
    if (refreshResult.ok) {
      console.log("refreshed");
      const response = await refreshResult.json();
      api.dispatch(
        setToken({
          access: response.access,
          refresh,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(deleteNormalConversation());
      api.dispatch(deleteRelapseConversation());
      api.dispatch(removeToken());
      api.dispatch(removeUser());
    }
  }
  return result;
};
