import { useForm } from "react-hook-form";
import {
  useAddCourseMutation,
  useGetCoursesQuery,
} from "../../../redux/api/courseApi";
import { useGetCategoriesQuery } from "../../../redux/api/categoryApi";
import { toast } from "react-toastify";
import CourseTable from "./CourseTable";

export type TCourse = {
  image: string;
  id: number;
  title: string;
  description: string;
  price: number;
  categories: number[];
  category_details: Category[];
};
type Category = {
  id: number;
  category: string;
};

const AddCourse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TCourse>();

  const [addCourse, { isLoading }] = useAddCourseMutation();
  const { data: courseData } = useGetCoursesQuery(null);

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery(null);

  //   const onSubmit = async (data: TCourse) => {
  //     try {
  //       await addCourse({
  //         ...data,
  //         categories: data.categories.map(Number), // Ensure categories are numbers
  //       }).unwrap();
  //       toast.success("Courses added successfully");
  //       reset(); // Reset the form after successful submission
  //     } catch (err) {
  //       console.error("Failed to add course", err);
  //     }
  //   };
  //   const onSubmit = async (data: TCourse) => {
  //     try {
  //       await addCourse({
  //         ...data,
  //         categories: data.categories.map(Number), // Ensure categories are numbers (just IDs)
  //       }).unwrap();
  //       toast.success("Course added successfully");
  //       reset(); // Reset the form after successful submission
  //     } catch (err) {
  //       console.error("Failed to add course", err);
  //       toast.error(
  //         "Failed to add course: " + (err.data?.message || "An error occurred")
  //       );
  //     }
  //   };
  const onSubmit = async (data: TCourse) => {
    try {
      await addCourse({
        ...data,
        categories: data.categories.map(Number), // Ensure categories are numbers
      }).unwrap();
      toast.success("Course added successfully");
      reset(); // Reset the form after successful submission
    } catch (err) {
      console.error("Failed to add course", err);
    }
  };

  // Custom validation for price
  const validatePrice = (value: number) => {
    if (value < 0) {
      return "Price cannot be negative"; // Custom error message
    }
    return true; // Validation passed
  };

  if (categoriesLoading) return <p>Loading Categories...</p>;
  if (categoriesError) return <p>Error loading categories</p>;

  return (
    <div className="mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Course</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Image URL Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Image URL
          </label>
          <input
            type="url"
            className={`w-full p-2 border rounded-lg ${
              errors.image ? "border-red-500" : "border-gray-300"
            }`}
            {...register("image", { required: "Image URL is required" })}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Title Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            className={`w-full p-2 border rounded-lg ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            className={`w-full p-2 border rounded-lg ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Price
          </label>
          <input
            type="number"
            className={`w-full p-2 border rounded-lg ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
            {...register("price", {
              required: "Price is required",
              validate: validatePrice, // Add custom validation here
            })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Category Selection (Multi-Select) */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Categories
          </label>
          {/* <select
            className={`w-full p-2 border rounded-lg ${
              errors.categories ? "border-red-500" : "border-gray-300"
            }`}
            multiple // Enable multiple category selection
            {...register("categories", {
              required: "At least one category is required",
            })}
          >
            {categories?.data?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select> */}
          <select
            className={`w-full p-2 border rounded-lg ${
              errors.categories ? "border-red-500" : "border-gray-300"
            }`}
            multiple
            {...register("categories", {
              required: "At least one category is required",
              validate: (value) =>
                value.length > 0 || "At least one category is required", // Ensure at least one category is selected
            })}
          >
            {categories?.data?.map((category: Category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>

          {errors.categories && (
            <p className="text-red-500 text-sm mt-1">
              {errors.categories.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-3 rounded-lg text-white font-semibold ${
            isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Course"}
        </button>
      </form>

      {/* Error Message */}
      {/* {isError && error && (
        <p className="text-red-500 mt-4 text-center">
          {error?.data?.message || "An error occurred while adding the course."}
        </p>
      )} */}

      <div className="overflow-x-auto mt-10">
        <table className="min-w-full  border ">
          <thead>
            <tr className=" uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Categories</th>
              <th className="py-3 px-6 text-left">Update</th>
              <th className="py-3 px-6 text-left">Delete</th>
            </tr>
          </thead>
          <tbody className=" text-sm font-semibold">
            {courseData?.data?.map((course: TCourse) => (
              <CourseTable key={course.id} course={course} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddCourse;
