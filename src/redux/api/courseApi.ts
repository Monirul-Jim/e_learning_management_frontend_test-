import { baseApi } from "./baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: (userInfo) => ({
        url: "/learning/courses/",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["course"],
    }),
    // getCategories: builder.query({
    //   query: () => ({
    //     url: "/learning/category/",
    //     method: "GET",
    //   }),
    //   providesTags: ["category"],
    // }),
    // deleteCategory: builder.mutation({
    //   query: (id) => ({
    //     url: `/learning/category/${id}/`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["category"],
    // }),
  }),
});
export const { useAddCourseMutation } = courseApi;
