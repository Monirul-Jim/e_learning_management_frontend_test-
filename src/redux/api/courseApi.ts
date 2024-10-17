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
    getCourses: builder.query({
      query: () => ({
        url: "/learning/courses/",
        method: "GET",
      }),
      providesTags: ["course"], // Corrected the tag to match the courses
    }),
    updateCourse: builder.mutation({
      // New update endpoint
      query: ({ id, ...updateData }) => ({
        url: `/learning/courses/${id}/`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["course"], // Invalidate course tag after update
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/learning/courses/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useAddCourseMutation,
  useGetCoursesQuery,
  useUpdateCourseMutation,
} = courseApi;
