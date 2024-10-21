import { useForm } from "react-hook-form";
import {
  useAddParentModuleMutation,
  useGetParentModulesQuery,
} from "../../../redux/api/courseApi";

const AddParentModule = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addParentModule, { isLoading }] = useAddParentModuleMutation();
  const {
    data: parentModuleData, // Rename to avoid conflict with variable names
    isLoading: parentLoading,
    error: parentError,
  } = useGetParentModulesQuery(null);

  console.log(parentModuleData); // Debug the fetched data

  const onSubmit = async (data) => {
    if (!data.title) {
      console.error("Title field is empty");
      return;
    }

    try {
      console.log("Form data:", data); // Log form data to inspect
      const response = await addParentModule({ title: data.title }).unwrap();
      console.log("Response:", response); // Log the response for debugging
      alert("Parent Module added successfully");
    } catch (error) {
      console.error("Failed to add parent module:", error);
    }
  };

  return (
    <div className="mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Parent Module Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className={`shadow appearance-none border ${
              errors.title ? "border-red-500" : ""
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Parent Module"}
          </button>
        </div>
      </form>

      {parentLoading && <p>Loading parent modules...</p>}

      {parentError && (
        <p>Failed to load parent modules: {parentError.message}</p>
      )}

      {parentModuleData && parentModuleData.data && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Parent Modules List</h2>
          <ul className="list-disc pl-5">
            {parentModuleData.data.map((module) => (
              <li
                key={module.id}
                className="mb-2 list-none py-1 bg-blue-400 m-4 px-4 rounded-lg"
              >
                {module.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddParentModule;
