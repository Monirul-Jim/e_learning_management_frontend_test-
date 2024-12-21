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
      invalidatesTags: ["parent"],
    }),
    updateParentModules: builder.mutation({
      query: ({ id, title }) => ({
        url: `/learning/parent-modules/${id}/`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["parent"],
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
    updateModules: builder.mutation({
      query: ({ id, module }) => ({
        url: `/learning/modules/${id}/`,
        method: "PUT",
        body: module,
      }),
      invalidatesTags: ["course"],
    }),

    getParentModules: builder.query({
      query: () => ({
        url: "/learning/parent-modules/",
        method: "GET",
      }),
      providesTags: ["parent"],
    }),
    getVideos: builder.query({
      query: () => ({
        url: "/learning/videos/",
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    getSingleVideo: builder.query({
      query: (courseId) => ({
        // url: `/learning/videos/${id}/`,
        url: `/learning/videos/course/${courseId}/`,
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
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/learning/quizzes/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["quiz"],
    }),
    getQuizAdmin: builder.query({
      query: () => ({
        url: "/learning/quizzes/",
        method: "GET",
      }),
      providesTags: ["quiz"],
    }),
    updateQuiz: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/learning/quizzes/${id}/`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["quiz"],
    }),

    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/learning/quizzes/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["quiz"],
    }),
    getQuizzes: builder.query({
      query: (moduleTitle) => {
        return moduleTitle
          ? `/learning/quizzes?module_title=${moduleTitle}`
          : "quizzes";
      },
    }),
    getQuizById: builder.query({
      query: (id) => `/learning/quizzes/${id}`,
    }),
  }),
});

export const {
  useAddCourseMutation,
  useGetCoursesQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useAddParentModuleMutation,
  useUpdateParentModulesMutation,
  useAddVideosMutation,
  useAddModulesMutation,
  useUpdateModulesMutation,
  useGetParentModulesQuery,
  useGetVideosQuery,
  useGetModulesQuery,
  useGetSingleVideoQuery,
  useAddQuizMutation,
  useGetQuizAdminQuery,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useGetQuizzesQuery,
} = courseApi;
