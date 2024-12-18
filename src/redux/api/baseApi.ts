import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-learning-social-platform.onrender.com",
    credentials: "include",
  }),
  tagTypes: ["category", "course", "payment", "parent"],
  endpoints: () => ({}),
});
