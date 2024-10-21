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
      query: (data) => ({
        url: "/learning/parent-modules/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),
    addVideos: builder.mutation({
      query: (data) => ({
        url: "/learning/videos/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),
    addModules: builder.mutation({
      query: (data) => ({
        url: "/learning/modules/",
        method: "POST",
        body: data,
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
    getSingleVideo: builder.query({
      query: (id) => ({
        url: `/learning/videos/${id}/`,
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
  useGetSingleVideoQuery,
} = courseApi;
