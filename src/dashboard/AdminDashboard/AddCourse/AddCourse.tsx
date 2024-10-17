import { useForm } from "react-hook-form";
import { useAddCourseMutation } from "../../../redux/api/courseApi";
import { useGetCategoriesQuery } from "../../../redux/api/categoryApi"; // To fetch categories

type TCourse = {
  image: string;
  title: string;
  description: string;
  category: number; // Assuming category is selected by ID
};

const AddCourse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TCourse>();

  const [addCourse, { isLoading, isSuccess, isError, error }] =
    useAddCourseMutation();
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery(null);

  const onSubmit = async (data: TCourse) => {
    try {
      await addCourse(data).unwrap();
      reset(); // Reset the form after successful submission
    } catch (err) {
      console.error("Failed to add course", err);
    }
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

        {/* Category Selection */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Category
          </label>
          <select
            className={`w-full p-2 border rounded-lg ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select a category</option>
            {categories?.data?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
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

      {/* Success Message */}
      {isSuccess && (
        <p className="text-green-500 mt-4 text-center">
          Course added successfully!
        </p>
      )}

      {/* Error Message */}
      {isError && error && (
        <p className="text-red-500 mt-4 text-center">
          {error.data?.message || "An error occurred while adding the course."}
        </p>
      )}
    </div>
  );
};

export default AddCourse;
