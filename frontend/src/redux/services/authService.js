import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./apiService.js";

export const authService = createApi({
  reducerPath: "authService",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "users/create",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "api/token",
        method: "POST",
        body: data,
      }),
    }),
    logoutUser: builder.mutation({
      query: (data) => ({
        url: "users/logout",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: () => {
        return {
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
