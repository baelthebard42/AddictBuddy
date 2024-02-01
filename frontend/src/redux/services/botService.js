import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./apiService";

export const botService = createApi({
  reducerPath: "botService",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getNormalReply: builder.mutation({
      query: (data) => {
        return {
          url: "buddy/botReply",
          method: "POST",
          body: data,
        };
      },
    }),
    getRelapseReply: builder.mutation({
      query: (data) => {
        return {
          url: "buddy/relapseBotReply",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllAccomplishments: builder.query({
      query: () => {
        return {
          url: "buddy/getAcc",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetNormalReplyMutation,
  useGetRelapseReplyMutation,
  useGetAllAccomplishmentsQuery,
} = botService;
