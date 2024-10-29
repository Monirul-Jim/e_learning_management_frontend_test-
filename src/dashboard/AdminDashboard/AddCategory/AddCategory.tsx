import { useForm } from "react-hook-form";
import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoriesMutation,
} from "../../../redux/api/categoryApi";
import { useState } from "react";

export type TCategory = {
  category: string;
  id?: number;
};

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCategory>();

  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null
  );

  const [addCategory, { isLoading, isSuccess }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdating, isSuccess: updateSuccess }] =
    useUpdateCategoriesMutation();
  const {
    data: getCategory,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetCategoriesQuery(null);

  const onSubmit = async (data: TCategory) => {
    try {
      if (selectedCategory) {
        await updateCategory({
          id: selectedCategory.id!,
          category: data.category,
        }).unwrap();
        setSelectedCategory(null);
      } else {
        await addCategory({ category: data.category }).unwrap();
        reset();
      }
      reset();
    } catch (err) {
      console.error("Failed to submit category", err);
    }
  };

  const handleUpdateClick = (category: TCategory) => {
    setSelectedCategory(category);
    reset({ category: category.category });
  };

  if (categoryLoading) return <p>Loading Categories...</p>;
  if (categoryError) return <p>Error loading categories</p>;

  return (
    <div className="mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {selectedCategory ? "Update Category" : "Add New Category"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        </div>
        <button
          type="submit"
          className={`w-full p-3 rounded-lg text-white font-semibold ${
            isLoading || isUpdating
              ? "bg-gray-400"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isLoading || isUpdating}
        >
          {isLoading || isUpdating
            ? selectedCategory
              ? "Updating..."
              : "Adding..."
            : selectedCategory
            ? "Update Category"
            : "Add Category"}
        </button>
      </form>

      {(isSuccess || updateSuccess) && (
        <p className="text-green-500 mt-4 text-center">
          {selectedCategory
            ? "Category updated successfully!"
            : "Category added successfully!"}
        </p>
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-4">
          {getCategory?.data?.map((category: TCategory) => (
            <li
              key={category.id}
              className="flex justify-between items-center p-2 border-b border-gray-200"
            >
              <span className="text-gray-800">{category?.category}</span>
              <button
                onClick={() => handleUpdateClick(category)}
                className="text-blue-500 hover:underline"
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddCategory;
