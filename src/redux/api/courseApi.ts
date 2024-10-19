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
      providesTags: ["course"],
    }),
    updateCourse: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/learning/courses/${id}/`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["course"],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/learning/courses/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["course"],
    }),
    addParentModule: builder.mutation({
      query: () => ({
        url: "/learning/parent-modules/",
        method: "POST",
      }),
      invalidatesTags: ["course"],
    }),
    addVideos: builder.mutation({
      query: () => ({
        url: "/learning/videos/",
        method: "POST",
      }),
      invalidatesTags: ["course"],
    }),
    addModules: builder.mutation({
      query: () => ({
        url: "/learning/modules/",
        method: "POST",
      }),
      invalidatesTags: ["course"],
    }),
    getParentModules: builder.query({
      query: () => ({
        url: "/learning/parent-modules/",
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    getVideos: builder.query({
      query: () => ({
        url: "/learning/videos/",
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    getModules: builder.query({
      query: () => ({
        url: "/learning/modules/",
        method: "GET",
      }),
      providesTags: ["course"],
    }),
  }),
});

export const {
  useAddCourseMutation,
  useGetCoursesQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useAddParentModuleMutation,
  useAddVideosMutation,
  useAddModulesMutation,
  useGetParentModulesQuery,
  useGetVideosQuery,
  useGetModulesQuery,
} = courseApi;
