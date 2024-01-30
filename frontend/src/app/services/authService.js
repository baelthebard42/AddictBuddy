import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://127.0.0.1:8000";

export const authService = createApi({
  reducerPath: "authService",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: "users/create",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: "api/token",
        method: "POST",
        body: data,
      }),
    }),
    logoutUser: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: "users/logout",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: (token) => {
        if (!token) return {};

        return {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
          url: "users/loggedUser",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
} = authService;
