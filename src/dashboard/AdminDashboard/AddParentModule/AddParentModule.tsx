import { useForm } from "react-hook-form";
import {
  useAddParentModuleMutation,
  useGetParentModulesQuery,
  useUpdateParentModulesMutation,
} from "../../../redux/api/courseApi";
import { useState } from "react";

type ParentModuleData = {
  id: number;
  title: string;
};

const AddParentModule = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ title: string }>();
  const [selectedModule, setSelectedModule] = useState<ParentModuleData | null>(
    null
  );

  const [addParentModule, { isLoading: adding }] = useAddParentModuleMutation();
  const [updateParentModules, { isLoading: updating }] =
    useUpdateParentModulesMutation();
  const {
    data: parentModuleData,
    isLoading: parentLoading,
    error: parentError,
  } = useGetParentModulesQuery(null);

  const onSubmit = async (data: { title: string }) => {
    if (!data.title) return;

    try {
      if (selectedModule) {
        await updateParentModules({
          id: selectedModule.id,
          title: data.title,
        }).unwrap();
        setSelectedModule(null);
      } else {
        await addParentModule({ title: data.title }).unwrap();
      }
      reset();
    } catch (error) {
      console.error("Failed to submit module:", error);
    }
  };

  const handleUpdateClick = (module: ParentModuleData) => {
    console.log("Data being submitted:", selectedModule);
    setSelectedModule(module);
    reset({ title: module.title });
  };

  return (
    <div className="mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {selectedModule
              ? "Update Parent Module Title"
              : "Parent Module Title"}
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
            disabled={adding || updating}
          >
            {adding || updating
              ? selectedModule
                ? "Updating..."
                : "Adding..."
              : selectedModule
              ? "Update Parent Module"
              : "Add Parent Module"}
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
            {parentModuleData?.data?.map((module: ParentModuleData) => (
              <li
                key={module.id}
                className="mb-2 list-none py-1 bg-blue-400 m-4 px-4 rounded-lg"
              >
                <span>{module.title}</span>
                <button
                  onClick={() => handleUpdateClick(module)}
                  className=" ml-4 underline"
                >
                  Update
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddParentModule;
