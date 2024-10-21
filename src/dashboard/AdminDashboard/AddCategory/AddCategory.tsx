import { useForm } from "react-hook-form";
import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
} from "../../../redux/api/categoryApi";

export type TCategory = {
  category: string;
  id: number;
};

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCategory>();

  // Destructure the mutation hook correctly
  const [addCategory, { isLoading, isSuccess, isError, error }] =
    useAddCategoryMutation();
  const {
    data: getCategory,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetCategoriesQuery(null);

  // const [deleteCategory, { isLoading: deleteLoading }] =
  //   useDeleteCategoryMutation();

  const onSubmit = async (data: TCategory) => {
    try {
      await addCategory({ category: data.category }).unwrap();
    } catch (err) {
      console.error("Failed to add category", err);
    }
  };

  if (categoryLoading) return <p>Loading Categories...</p>;
  if (categoryError) return <p>Error loading categories</p>;

  // const handleDelete = async (id: number) => {
  //   try {
  //     await deleteCategory(id).unwrap();
  //   } catch (error) {
  //     console.error("Failed to delete category", error);
  //   }
  // };

  return (
    <div className="mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Category</h1>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Category Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Category Name
          </label>
          <input
            type="text"
            className={`w-full p-2 border rounded-lg ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
            {...register("category", { required: "Category name is required" })}
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
          {/* Display error message for mutation errors */}
          {isError && error && (
            <p className="text-red-500 text-sm mt-1">
              {error.data?.message || "An error occurred."}
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
          {isLoading ? "Adding..." : "Add Category"}
        </button>
      </form>

      {/* Feedback after submission */}
      {isSuccess && (
        <p className="text-green-500 mt-4 text-center">
          Category added successfully!
        </p>
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-4">
          {getCategory?.data?.map((category: TCategory) => (
            <li
              key={category.id}
              className="flex justify-between items-center p-2 border-b border-gray-200"
            >
              <span className="text-gray-800">{category?.category}</span>
              {/* <button
                onClick={() => handleDelete(category.id)}
                className={`ml-4  bg-red-600 text-white p-1 rounded-lg transition-colors ${
                  deleteLoading ? "opacity-50" : ""
                }`}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddCategory;
