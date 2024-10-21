import { useForm } from "react-hook-form";
import {
  useAddVideosMutation,
  useGetModulesQuery,
} from "../../../redux/api/courseApi";
import { toast } from "react-toastify";

const AddVideo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [addVideo, { isLoading }] = useAddVideosMutation();
  const {
    data: moduleData,
    isLoading: moduleLoading,
    error: moduleError,
  } = useGetModulesQuery(null);
  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // Call the mutation to add a video
      await addVideo({
        title: data.title,
        video_url: data.video_url,
        duration: data.duration,
        module: data.module, // Module ID
      }).unwrap();

      // Display success alert
      toast.success("Video added successfully");

      // Reset the form
      reset();
    } catch (error) {
      console.error("Failed to add video:", error);
      toast.error("Failed to add video. Please try again.");
    }
  };

  return (
    <div className=" mx-auto my-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-xl font-bold mb-4">Add New Video</h2>
        {/* Module ID Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Module
          </label>
          <select
            {...register("module")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a module...</option>
            {!moduleLoading &&
              moduleData?.data?.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.title}
                </option>
              ))}
          </select>
          {errors.module && (
            <p className="text-red-500 text-xs italic">
              {errors.module.message}
            </p>
          )}
        </div>
        {/* Video Title Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Video Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title", { required: "Video title is required" })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Video URL Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="video_url"
          >
            Video URL
          </label>
          <input
            id="video_url"
            type="url"
            {...register("video_url", {
              required: "Video URL is required",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Invalid URL format",
              },
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.video_url ? "border-red-500" : ""
            }`}
          />
          {errors.video_url && (
            <p className="text-red-500 text-xs italic">
              {errors.video_url.message}
            </p>
          )}
        </div>

        {/* Duration Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="duration"
          >
            Duration (Format: HH:MM:SS)
          </label>
          <input
            id="duration"
            type="text"
            {...register("duration", {
              required: "Duration is required",
              pattern: {
                // Updated regex for both one and two-digit hours
                value: /^([0-9]{1,2}):([0-9]{2}):([0-9]{2})$/,
                message: "Duration must be in format HH:MM:SS",
              },
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.duration ? "border-red-500" : ""
            }`}
          />
          {errors.duration && (
            <p className="text-red-500 text-xs italic">
              {errors.duration.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Video"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVideo;
