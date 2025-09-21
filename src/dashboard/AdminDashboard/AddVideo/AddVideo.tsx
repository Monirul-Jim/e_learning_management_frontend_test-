// import { useForm } from "react-hook-form";
// import {
//   useAddVideosMutation,
//   useGetModulesQuery,
//   useGetVideosQuery,
// } from "../../../redux/api/courseApi";
// import { toast } from "react-toastify";
// // CategoryDetail type for course categories
// interface CategoryDetail {
//   id: number;
//   category: string;
//   slug: string;
// }

// // CourseDetail type for video course details
// interface CourseDetail {
//   id: number;
//   image: string;
//   title: string;
//   description: string;
//   price: number;
//   category_details: CategoryDetail[];
// }

// // ParentModuleDetail type for parent module details
// interface ParentModuleDetail {
//   id: number;
//   title: string;
// }

// // ModuleDetail type for video module details
// interface ModuleDetail {
//   id: number;
//   title: string;
//   description: string;
//   course_details: CourseDetail;
//   parent_module_details?: ParentModuleDetail;
// }

// // Video type for the overall video structure
// export interface Video {
//   id: number;
//   title: string;
//   video_url: string;
//   duration: string;
//   module_details: ModuleDetail;
// }

// const AddVideo = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();
//   const [addVideo, { isLoading }] = useAddVideosMutation();
//   const { data: moduleData, isLoading: moduleLoading } =
//     useGetModulesQuery(null);

//   const { data: videoData, isLoading: videoLoading } = useGetVideosQuery(null);
//   if (videoLoading) {
//     return <p>Loading videos...</p>;
//   }

//   if (!videoData || videoData.length === 0) {
//     return <p>No videos available.</p>;
//   }
//   // Form submission handler
//   const onSubmit = async (data) => {
//     try {
//       await addVideo({
//         title: data.title,
//         video_url: data.video_url,
//         duration: data.duration,
//         module: parseInt(data.module, 10), // Ensure module is an integer ID
//       }).unwrap();

//       // Display success alert
//       toast.success("Video added successfully");

//       // Reset the form
//       reset();
//     } catch (error) {
//       console.error("Failed to add video:", error);
//       toast.error("Failed to add video. Please try again.");
//     }
//   };

//   return (
//     <div className=" mx-auto my-8">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//       >
//         <h2 className="text-xl font-bold mb-4">Add New Video</h2>
//         {/* Module ID Input */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Select Module
//           </label>
//           <select
//             {...register("module")}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           >
//             <option value="">Select a module...</option>
//             {!moduleLoading &&
//               moduleData?.data?.map((module: ModuleDetail) => (
//                 <option key={module.id} value={module.id}>
//                   {module.title}
//                 </option>
//               ))}
//           </select>
//           {errors.module && (
//             <p className="text-red-500 text-xs italic">
//               {errors.module.message}
//             </p>
//           )}
//         </div>
//         {/* Video Title Input */}
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="title"
//           >
//             Video Title
//           </label>
//           <input
//             id="title"
//             type="text"
//             {...register("title", { required: "Video title is required" })}
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               errors.title ? "border-red-500" : ""
//             }`}
//           />
//           {errors.title && (
//             <p className="text-red-500 text-xs italic">
//               {errors.title.message}
//             </p>
//           )}
//         </div>

//         {/* Video URL Input */}
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="video_url"
//           >
//             Video URL
//           </label>
//           <input
//             id="video_url"
//             type="url"
//             {...register("video_url", {
//               required: "Video URL is required",
//               pattern: {
//                 value: /^(ftp|http|https):\/\/[^ "]+$/,
//                 message: "Invalid URL format",
//               },
//             })}
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               errors.video_url ? "border-red-500" : ""
//             }`}
//           />
//           {errors.video_url && (
//             <p className="text-red-500 text-xs italic">
//               {errors.video_url.message}
//             </p>
//           )}
//         </div>

//         {/* Duration Input */}
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="duration"
//           >
//             Duration (Format: HH:MM:SS)
//           </label>
//           <input
//             id="duration"
//             type="text"
//             {...register("duration", {
//               required: "Duration is required",
//               pattern: {
//                 // Updated regex for both one and two-digit hours
//                 value: /^([0-9]{1,2}):([0-9]{2}):([0-9]{2})$/,
//                 message: "Duration must be in format HH:MM:SS",
//               },
//             })}
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               errors.duration ? "border-red-500" : ""
//             }`}
//           />
//           {errors.duration && (
//             <p className="text-red-500 text-xs italic">
//               {errors.duration.message}
//             </p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={isLoading}
//           >
//             {isLoading ? "Adding..." : "Add Video"}
//           </button>
//         </div>
//       </form>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-lg">
//           <thead>
//             <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//               <th className="py-3 px-6 text-left">Title</th>
//               <th className="py-3 px-6 text-left">Duration</th>
//               <th className="py-3 px-6 text-left">Module</th>
//               <th className="py-3 px-6 text-left">Course</th>
//               <th className="py-3 px-6 text-left">Video Link</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700 text-sm font-light">
//             {videoData.map((video: Video) => (
//               <tr
//                 key={video.id}
//                 className="border-b border-gray-200 hover:bg-gray-100"
//               >
//                 <td className="py-3 px-6 text-left font-medium">
//                   {video.title}
//                 </td>
//                 <td className="py-3 px-6 text-left">{video.duration}</td>
//                 <td className="py-3 px-6 text-left">
//                   {video.module_details.title}
//                 </td>
//                 <td className="py-3 px-6 text-left">
//                   {video.module_details.course_details.title}
//                 </td>
//                 <td className="py-3 px-6 text-left">
//                   <a
//                     href={video.video_url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-500 underline"
//                   >
//                     Watch Video
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AddVideo;
import { useForm,type SubmitHandler } from "react-hook-form";
import {
  useAddVideosMutation,
  useGetModulesQuery,
  useGetVideosQuery,
} from "../../../redux/api/courseApi";
import { toast } from "react-toastify";

// Define the type for form data
interface FormData {
  module: string;
  title: string;
  video_url: string;
  duration: string;
}

interface CategoryDetail {
  id: number;
  category: string;
  slug: string;
}

interface CourseDetail {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  category_details: CategoryDetail[];
}

interface ParentModuleDetail {
  id: number;
  title: string;
}

interface ModuleDetail {
  id: number;
  title: string;
  description: string;
  course_details: CourseDetail;
  parent_module_details?: ParentModuleDetail;
}

export interface Video {
  id: number;
  title: string;
  video_url: string;
  duration: string;
  module_details: ModuleDetail;
}

const AddVideo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>(); // Use the FormData interface here
  const [addVideo, { isLoading }] = useAddVideosMutation();
  const { data: moduleData, isLoading: moduleLoading } =
    useGetModulesQuery(null);
  const { data: videoData, isLoading: videoLoading } = useGetVideosQuery(null);

  if (videoLoading) {
    return <p>Loading videos...</p>;
  }

  if (!videoData || videoData.length === 0) {
    return <p>No videos available.</p>;
  }

  // Form submission handler
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await addVideo({
        title: data.title,
        video_url: data.video_url,
        duration: data.duration,
        module: parseInt(data.module, 10), // Ensure module is an integer ID
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
    <div className="mx-auto my-8">
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
            {...register("module", { required: "Module is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a module...</option>
            {!moduleLoading &&
              moduleData?.data?.map((module: ModuleDetail) => (
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
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Duration</th>
              <th className="py-3 px-6 text-left">Module</th>
              <th className="py-3 px-6 text-left">Course</th>
              <th className="py-3 px-6 text-left">Video Link</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {videoData.map((video: Video) => (
              <tr
                key={video.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left font-medium">
                  {video.title}
                </td>
                <td className="py-3 px-6 text-left">{video.duration}</td>
                <td className="py-3 px-6 text-left">
                  {video.module_details.title}
                </td>
                <td className="py-3 px-6 text-left">
                  {video.module_details.course_details.title}
                </td>
                <td className="py-3 px-6 text-left">
                  <a
                    href={video.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Watch Video
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddVideo;
