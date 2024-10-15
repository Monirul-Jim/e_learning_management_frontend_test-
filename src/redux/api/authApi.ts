import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userInfo) => ({
        url: "/sign-login/register/",
        method: "POST",
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/sign-login/login/",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
export const { useRegisterUserMutation, useLoginMutation } = authApi;
