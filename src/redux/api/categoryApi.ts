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
    // deleteCategory: builder.mutation({
    //   query: (id) => ({
    //     url: `/learning/category/${id}/`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["category"],
    // }),
  }),
});
export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  // useDeleteCategoryMutation,
} = categoryApi;
