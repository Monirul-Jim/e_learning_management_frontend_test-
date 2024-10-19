import { useForm } from "react-hook-form";
import { useAddParentModuleMutation } from "../../../redux/api/courseApi";

const AddParentModule = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addParentModule, { isLoading }] = useAddParentModuleMutation();

  const onSubmit = async (data) => {
    try {
      await addParentModule({ title: data.title }).unwrap();
      alert("Parent Module added successfully");
    } catch (error) {
      console.error("Failed to add parent module:", error);
    }
  };

  return (
    <div className=" mx-auto">
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
            {...register("title", { required: true })}
            className={`shadow appearance-none border ${
              errors.title ? "border-red-500" : ""
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">Title is required.</p>
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
    </div>
  );
};

export default AddParentModule;
