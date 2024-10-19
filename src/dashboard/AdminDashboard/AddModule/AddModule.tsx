import { useForm } from "react-hook-form";
import {
  useAddModulesMutation,
  useGetCoursesQuery,
  useGetParentModulesQuery,
} from "../../../redux/api/courseApi";

const AddModule = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addModule, { isLoading }] = useAddModulesMutation();
  // Fetch courses and parent modules
  const { data: coursesData, isLoading: loadingCourses } =
    useGetCoursesQuery(null);
  const { data: parentModulesData, isLoading: loadingParentModules } =
    useGetParentModulesQuery(null);
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await addModule({
        title: data.title,
        description: data.description,
        parent_module: data.parent_module,
        course: data.course,
      }).unwrap();
      alert("Module added successfully");
    } catch (error) {
      console.error("Failed to add module:", error);
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
            Select Course
          </label>
          <select
            {...register("course", { required: true })}
            className={`shadow appearance-none border ${
              errors.course ? "border-red-500" : ""
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          >
            <option value="">Select a course...</option>
            {!loadingCourses &&
              coursesData?.data?.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
          </select>
          {errors.course && (
            <p className="text-red-500 text-xs italic">Course is required.</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Parent Module (Optional)
          </label>
          <select
            {...register("parent_module")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a parent module...</option>
            {!loadingParentModules &&
              parentModulesData?.data?.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.title}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Module Title
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

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description (Optional)
          </label>
          <textarea
            {...register("description")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Module"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddModule;
