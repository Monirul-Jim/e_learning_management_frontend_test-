import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://127.0.0.1:8000",
    baseUrl: "https://e-learning-management-backend-test-xdsz.onrender.com",

    credentials: "include",
  }),
  tagTypes: ["category", "course", "payment", "parent", "quiz"],
  endpoints: () => ({}),
});
