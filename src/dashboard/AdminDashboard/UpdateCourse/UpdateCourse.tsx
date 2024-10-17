import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useGetCoursesQuery,
  useUpdateCourseMutation,
} from "../../../redux/api/courseApi";
import { useGetCategoriesQuery } from "../../../redux/api/categoryApi";
import { toast } from "react-toastify";

const UpdateCourse = () => {
  const { id } = useParams();

  // Fetch course data and categories
  const { data: courseData } = useGetCoursesQuery(null);
  const { data: categoriesData } = useGetCategoriesQuery(null);
  const [updateCourse] = useUpdateCourseMutation();
  const navigate = useNavigate();

  // Initialize form handling
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (courseData) {
      const existingCourse = courseData?.data?.find(
        (course) => course.id === Number(id)
      );
      if (existingCourse) {
        setValue("image", existingCourse.image);
        setValue("title", existingCourse.title);
        setValue("description", existingCourse.description);
        setValue("price", existingCourse.price);
        setValue(
          "categories",
          existingCourse.category_details.map((cat) => cat.id)
        );
      }
    }
  }, [courseData, id, setValue]);

  const onSubmit = async (data) => {
    const categoryData = data.categories.map((categoryId) => {
      const category = categoriesData?.data.find(
        (cat) => cat.id === categoryId
      );
      return {
        id: categoryId,
        category: category?.category || null,
      };
    });

    try {
      await updateCourse({ id, ...data, category_details: categoryData });
      toast.success("Course Update Successfully");
      navigate("/dashboard/add-course");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-5">Update Course</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-1">Image:</label>
          <input
            type="url"
            className={`border rounded p-2 w-full ${
              errors.image ? "border-red-500" : ""
            }`}
            {...register("image", { required: "Image is required" })}
          />
          {errors.image && (
            <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            className={`border rounded p-2 w-full ${
              errors.title ? "border-red-500" : ""
            }`}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description:</label>
          <textarea
            className={`border rounded p-2 w-full ${
              errors.description ? "border-red-500" : ""
            }`}
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Price:</label>
          <input
            type="number"
            className={`border rounded p-2 w-full ${
              errors.price ? "border-red-500" : ""
            }`}
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Categories:</label>
          <select
            multiple
            className="border rounded p-2 w-full"
            {...register("categories", {
              required: "At least one category is required",
            })}
          >
            {categoriesData &&
              categoriesData.data.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category}
                </option>
              ))}
          </select>
          {errors.categories && (
            <p className="text-red-500 text-xs mt-1">
              {errors.categories.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-200 w-full"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
