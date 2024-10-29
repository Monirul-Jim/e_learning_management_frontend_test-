import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (userInfo) => ({
        url: "/learning/category/",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["category"],
    }),
    getCategories: builder.query({
      query: () => ({
        url: "/learning/category/",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    updateCategories: builder.mutation({
      query: ({ id, category }) => ({
        url: `/learning/category/${id}/`,
        method: "PUT",
        body: { category },
      }),
      invalidatesTags: ["category"],
    }),
  }),
});
export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoriesMutation,
} = categoryApi;
