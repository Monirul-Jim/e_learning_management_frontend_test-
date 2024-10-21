import { useForm } from "react-hook-form";
import {
  useAddModulesMutation,
  useGetCoursesQuery,
  useGetModulesQuery,
  useGetParentModulesQuery,
} from "../../../redux/api/courseApi";
import { toast } from "react-toastify";

const AddModule = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addModules, { isLoading }] = useAddModulesMutation();
  const { data: coursesData, isLoading: loadingCourses } =
    useGetCoursesQuery(null);
  const { data: parentModulesData, isLoading: loadingParentModules } =
    useGetParentModulesQuery(null);
  const {
    data: modulesData,
    isLoading: modulesLoading,
    error: moduleError,
  } = useGetModulesQuery(null);
  const onSubmit = async (data) => {
    const selectedCourse = coursesData?.data?.find(
      (course) => course.id === Number(data.course)
    );

    if (!selectedCourse) {
      alert("Course not found");
      return;
    }
    let selectedParentModule = null;
    if (data.parent_module) {
      selectedParentModule = parentModulesData?.data?.find(
        (module) => module.id === Number(data.parent_module)
      );

      if (!selectedParentModule) {
        alert("Parent module not found");
        return;
      }
    }
    const payload = {
      course: selectedCourse.id,
      parent_module: selectedParentModule.id,
      title: data.title,
      description: data.description || "",
    };

    try {
      await addModules(payload).unwrap();
      toast.success("Module added successfully");
    } catch (err) {
      console.error("Failed to add module:", err);
      toast.error(
        "Failed to add module: " + (err.data?.message || "Unknown error")
      );
    }
  };

  if (modulesLoading) {
    return <p>Loading modules...</p>;
  }

  if (moduleError) {
    return (
      <p>
        Error loading modules: {moduleError.message || "Something went wrong"}
      </p>
    );
  }
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
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Module"}
          </button>
        </div>
      </form>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Modules List
      </h2>

      {modulesData && modulesData.data && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Modules List</h2>
          <ul className="list-none pl-0">
            {modulesData.data.map((module) => (
              <li
                key={module.id}
                className="mb-2 py-2 bg-blue-400  m-4 px-4 rounded-lg shadow-lg"
              >
                <h3 className="text-lg font-semibold">{module.title}</h3>
                <p className="text-sm">
                  Description:{" "}
                  {module.description || "No description available"}
                </p>
                <p className="text-sm">
                  Course: {module.course || "No course associated"}
                </p>
                {module.parent_module && (
                  <p className="text-sm">
                    Parent Module: {module?.parent_module}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Handle case where no modules exist */}
      {!modulesLoading && modulesData?.data?.length === 0 && (
        <p className="text-center text-gray-500">No modules available.</p>
      )}
    </div>
  );
};

export default AddModule;
