// import { useGetSingleVideoQuery } from "../../../redux/api/courseApi";
// import { useParams } from "react-router-dom";
// const SeeClass = () => {
//   const { id } = useParams();
//   const { data: videos, isLoading, error } = useGetSingleVideoQuery(id);

//   if (isLoading) return <p>Loading videos...</p>;
//   if (error) return <p>Error loading videos</p>;
//   console.log(videos);

//   return (
//     <div>
//       <h1>Hello, This is SeeClass component</h1>
//     </div>
//   );
// };

// export default SeeClass;

import { useGetSingleVideoQuery } from "../../../redux/api/courseApi";
import { useParams } from "react-router-dom";

const SeeClass = () => {
  const { id } = useParams();
  const { data: video, isLoading, error } = useGetSingleVideoQuery(id);

  if (isLoading) return <p>Loading videos...</p>;
  if (error) return <p>Error loading videos</p>;

  if (!video || video.length === 0) return <p>No videos available</p>;

  return (
    <div className="">
      <div className="">
        <h2 className="text-xl font-bold mb-4">{video?.data?.title}</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full"
            src={
              video?.data?.video_url
                ? video?.data?.video_url.replace("watch?v=", "embed/")
                : ""
            }
            title={video?.data?.title}
            allowFullScreen
          ></iframe>
        </div>
        <p className="mt-2 text-gray-600">Duration: {video?.data?.duration}</p>
      </div>

      <div className=" bg-gray-200 p-4">
        <h3 className="text-lg font-semibold">Video Details</h3>
        <p className="mb-2">
          <strong>Title:</strong> {video?.data?.title}
        </p>
        <p>
          <strong>Duration:</strong> {video?.data?.duration}
        </p>
      </div>
    </div>
  );
};

export default SeeClass;
