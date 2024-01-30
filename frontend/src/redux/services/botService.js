import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://127.0.0.1:8000/buddy";

export const botService = createApi({
  reducerPath: "botService",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNormalReply: builder.mutation({
      query: ({ data, token }) => {
        return {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
          url: "botReply",
          method: "POST",
          body: data,
        };
      },
    }),
    getRelapseReply: builder.mutation({
      query: ({ data, token }) => {
        return {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
          url: "relapseBotReply",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllAccomplishments: builder.query({
      query: (token) => {
        return {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
          url: "getAcc",
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
