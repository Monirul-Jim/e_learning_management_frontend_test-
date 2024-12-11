// import { useGetSingleVideoQuery } from "../../../redux/api/courseApi";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import SeeClassVideo from "./SeeClassVideo";

// interface Video {
//   id: number;
//   title: string;
//   video_url: string;
//   duration: string;
//   module_details: {
//     title: string;
//     course_details: {
//       title: string;
//       image: string;
//       description: string;
//       price: number;
//       category_details: {
//         id: number;
//         category: string;
//         slug: string;
//       }[];
//     };
//     parent_module_details: {
//       title: string;
//     };
//     description: string;
//   };
// }

// const SeeClass: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const {
//     data: videoData,
//     isLoading,
//     error,
//   } = useGetSingleVideoQuery(id as string);
//   const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
//   const [collapsedParents, setCollapsedParents] = useState<{
//     [key: string]: boolean;
//   }>({});
//   const [collapsedChildren, setCollapsedChildren] = useState<{
//     [key: string]: boolean;
//   }>({});

//   useEffect(() => {
//     if (videoData && videoData.data.length > 0) {
//       setSelectedVideo(videoData.data[0]);
//     }
//   }, [videoData]);

//   if (isLoading) return <p>Loading videos...</p>;
//   if (error) return <p>Error loading videos</p>;
//   if (!videoData || videoData.data.length === 0)
//     return <p>No videos available</p>;

//   // const groupedVideos = videoData.data.reduce((acc, video) => {
//   //   const parentTitle =
//   //     video.module_details.parent_module_details.title || "Unknown Parent";
//   //   const childTitle = video.module_details.title || "Unknown Child";

//   //   if (!acc[parentTitle]) acc[parentTitle] = {};
//   //   if (!acc[parentTitle][childTitle]) acc[parentTitle][childTitle] = [];

//   //   acc[parentTitle][childTitle].push(video);
//   //   return acc;
//   // }, {} as { [parentTitle: string]: { [childTitle: string]: Video[] } });
//   const groupedVideos = videoData.data.reduce(
//     (
//       acc: { [parentTitle: string]: { [childTitle: string]: Video[] } },
//       video: Video
//     ) => {
//       const parentTitle =
//         video.module_details.parent_module_details.title || "Unknown Parent";
//       const childTitle = video.module_details.title || "Unknown Child";

//       if (!acc[parentTitle]) acc[parentTitle] = {};
//       if (!acc[parentTitle][childTitle]) acc[parentTitle][childTitle] = [];

//       acc[parentTitle][childTitle].push(video);
//       return acc;
//     },
//     {} as { [parentTitle: string]: { [childTitle: string]: Video[] } }
//   );

//   // const flattenedVideos = Object.values(groupedVideos).flatMap((childModules) =>
//   //   Object.values(childModules).flat()
//   // ) as Video[];
//   const flattenedVideos = Object.values(groupedVideos).flatMap((childModules) =>
//     Object.values(childModules).flat()
//   ) as Video[];

//   const currentIndex = selectedVideo
//     ? flattenedVideos.findIndex((v) => v.id === selectedVideo.id)
//     : -1;
//   const hasNext = currentIndex < flattenedVideos.length - 1;
//   const hasPrev = currentIndex > 0;

//   const handleNext = () => {
//     if (hasNext) setSelectedVideo(flattenedVideos[currentIndex + 1]);
//   };

//   const handlePrev = () => {
//     if (hasPrev) setSelectedVideo(flattenedVideos[currentIndex - 1]);
//   };

//   const toggleParentCollapse = (parentTitle: string) => {
//     setCollapsedParents((prev) => ({
//       ...prev,
//       [parentTitle]: !prev[parentTitle],
//     }));
//   };

//   const toggleChildCollapse = (childTitle: string) => {
//     setCollapsedChildren((prev) => ({
//       ...prev,
//       [childTitle]: !prev[childTitle],
//     }));
//   };

//   return (
//     <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
//       <div className="flex-1">
//         {selectedVideo && (
//           <div className="space-y-4">
//             <SeeClassVideo video={selectedVideo} />
//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={handlePrev}
//                 disabled={!hasPrev}
//                 className={`px-3 py-2 rounded-lg mx-2  transition-colors ${
//                   !hasPrev
//                     ? "opacity-50 cursor-not-allowed bg-gray-300"
//                     : "bg-blue-500 text-white hover:bg-blue-600"
//                 }`}
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={handleNext}
//                 disabled={!hasNext}
//                 className={`px-3 py-2 rounded-lg transition-colors ${
//                   !hasNext
//                     ? "opacity-50 cursor-not-allowed bg-gray-300"
//                     : "bg-blue-500 text-white hover:bg-blue-600"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="flex-1 md:w-1/3 space-y-4">
//         <h2 className="text-xl font-semibold mb-4">Video List</h2>
//         <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-md p-2">
//           {Object.entries(groupedVideos).map(([parentTitle, childModules]) => (
//             <div key={parentTitle} className="mb-4 transition-all duration-300">
//               <h3
//                 onClick={() => toggleParentCollapse(parentTitle)}
//                 className="font-semibold text-gray-700 mb-2 cursor-pointer transition-all duration-300"
//               >
//                 {parentTitle} {collapsedParents[parentTitle] ? "▲" : "▼"}
//               </h3>
//               <div
//                 className={`${
//                   collapsedParents[parentTitle]
//                     ? "max-h-0 overflow-hidden"
//                     : "max-h-full"
//                 } transition-all duration-300`}
//               >
//                 {/* {Object.entries(childModules).map(([childTitle, videos]) => (
//                   <div key={childTitle} className="ml-4 mb-2">
//                     <h4
//                       onClick={() => toggleChildCollapse(childTitle)}
//                       className="font-semibold text-gray-600 mb-1 cursor-pointer transition-all duration-300"
//                     >
//                       {childTitle} {collapsedChildren[childTitle] ? "▲" : "▼"}
//                     </h4>
//                     <div
//                       className={`${
//                         collapsedChildren[childTitle]
//                           ? "max-h-0 overflow-hidden"
//                           : "max-h-full"
//                       } transition-all duration-300`}
//                     >
//                       {videos?.map((videoItem) => (
//                         <p
//                           key={videoItem.id}
//                           onClick={() => setSelectedVideo(videoItem)}
//                           className={`cursor-pointer bg-sky-500 text-white p-1 px-3 mt-2 rounded-lg transition-colors ${
//                             selectedVideo && selectedVideo.id === videoItem.id
//                               ? "bg-blue-700 font-bold"
//                               : "hover:bg-blue-500"
//                           }`}
//                         >
//                           {videoItem?.title} - {videoItem?.duration}
//                         </p>
//                       ))}
//                     </div>
//                   </div>
//                 ))} */}
//                 {Object.entries(groupedVideos).map(
//                   ([parentTitle, childModules]) => (
//                     <div
//                       key={parentTitle}
//                       className="mb-4 transition-all duration-300"
//                     >
//                       <h3
//                         onClick={() => toggleParentCollapse(parentTitle)}
//                         className="font-semibold text-gray-700 mb-2 cursor-pointer transition-all duration-300"
//                       >
//                         {parentTitle}{" "}
//                         {collapsedParents[parentTitle] ? "▲" : "▼"}
//                       </h3>
//                       <div
//                         className={`${
//                           collapsedParents[parentTitle]
//                             ? "max-h-0 overflow-hidden"
//                             : "max-h-full"
//                         } transition-all duration-300`}
//                       >
//                         {Object.entries(childModules).map(
//                           ([childTitle, videos]) => (
//                             <div key={childTitle} className="ml-4 mb-2">
//                               <h4
//                                 onClick={() => toggleChildCollapse(childTitle)}
//                                 className="font-semibold text-gray-600 mb-1 cursor-pointer transition-all duration-300"
//                               >
//                                 {childTitle}{" "}
//                                 {collapsedChildren[childTitle] ? "▲" : "▼"}
//                               </h4>
//                               <div
//                                 className={`${
//                                   collapsedChildren[childTitle]
//                                     ? "max-h-0 overflow-hidden"
//                                     : "max-h-full"
//                                 } transition-all duration-300`}
//                               >
//                                 {videos?.map((videoItem: Video) => (
//                                   <p
//                                     key={videoItem.id}
//                                     onClick={() => setSelectedVideo(videoItem)}
//                                     className={`cursor-pointer bg-sky-500 text-white p-1 px-3 mt-2 rounded-lg transition-colors ${
//                                       selectedVideo &&
//                                       selectedVideo.id === videoItem.id
//                                         ? "bg-blue-700 font-bold"
//                                         : "hover:bg-blue-500"
//                                     }`}
//                                   >
//                                     {videoItem?.title} - {videoItem?.duration}
//                                   </p>
//                                 ))}
//                               </div>
//                             </div>
//                           )
//                         )}
//                       </div>
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeeClass;

// import { useGetSingleVideoQuery } from "../../../redux/api/courseApi";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import SeeClassVideo from "./SeeClassVideo";

// interface Video {
//   id: number;
//   title: string;
//   video_url: string;
//   duration: string;
//   module_details: {
//     title: string;
//     course_details: {
//       title: string;
//       image: string;
//       description: string;
//       price: number;
//       category_details: {
//         id: number;
//         category: string;
//         slug: string;
//       }[];
//     };
//     parent_module_details: {
//       title: string;
//     };
//     description: string;
//   };
// }

// const SeeClass: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const {
//     data: videoData,
//     isLoading,
//     error,
//   } = useGetSingleVideoQuery(id as string);
//   const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
//   const [collapsedParents, setCollapsedParents] = useState<{
//     [key: string]: boolean;
//   }>({});
//   const [collapsedChildren, setCollapsedChildren] = useState<{
//     [key: string]: boolean;
//   }>({});

//   useEffect(() => {
//     if (videoData && videoData.data.length > 0) {
//       setSelectedVideo(videoData.data[0]);
//     }
//   }, [videoData]);

//   if (isLoading) return <p>Loading videos...</p>;
//   if (error) return <p>Error loading videos</p>;
//   if (!videoData || videoData.data.length === 0)
//     return <p>No videos available</p>;

//   const groupedVideos = videoData.data.reduce(
//     (
//       acc: { [parentTitle: string]: { [childTitle: string]: Video[] } },
//       video: Video
//     ) => {
//       const parentTitle =
//         video.module_details.parent_module_details.title || "Unknown Parent";
//       const childTitle = video.module_details.title || "Unknown Child";

//       if (!acc[parentTitle]) acc[parentTitle] = {};
//       if (!acc[parentTitle][childTitle]) acc[parentTitle][childTitle] = [];

//       acc[parentTitle][childTitle].push(video);
//       return acc;
//     },
//     {} as { [parentTitle: string]: { [childTitle: string]: Video[] } }
//   );

//   const flattenedVideos = Object.values(groupedVideos).flatMap((childModules) =>
//     Object.values(childModules).flat()
//   ) as Video[];

//   const currentIndex = selectedVideo
//     ? flattenedVideos.findIndex((v) => v.id === selectedVideo.id)
//     : -1;
//   const hasNext = currentIndex < flattenedVideos.length - 1;
//   const hasPrev = currentIndex > 0;

//   const handleNext = () => {
//     if (hasNext) setSelectedVideo(flattenedVideos[currentIndex + 1]);
//   };

//   const handlePrev = () => {
//     if (hasPrev) setSelectedVideo(flattenedVideos[currentIndex - 1]);
//   };

//   const toggleParentCollapse = (parentTitle: string) => {
//     setCollapsedParents((prev) => ({
//       ...prev,
//       [parentTitle]: !prev[parentTitle],
//     }));
//   };

//   const toggleChildCollapse = (childTitle: string) => {
//     setCollapsedChildren((prev) => ({
//       ...prev,
//       [childTitle]: !prev[childTitle],
//     }));
//   };

//   return (
//     <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
//       <div className="flex-1">
//         {selectedVideo && (
//           <div className="space-y-4">
//             <SeeClassVideo video={selectedVideo} />
//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={handlePrev}
//                 disabled={!hasPrev}
//                 className={`px-3 py-2 rounded-lg mx-2 transition-colors ${
//                   !hasPrev
//                     ? "opacity-50 cursor-not-allowed bg-gray-300"
//                     : "bg-blue-500 text-white hover:bg-blue-600"
//                 }`}
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={handleNext}
//                 disabled={!hasNext}
//                 className={`px-3 py-2 rounded-lg transition-colors ${
//                   !hasNext
//                     ? "opacity-50 cursor-not-allowed bg-gray-300"
//                     : "bg-blue-500 text-white hover:bg-blue-600"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="flex-1 md:w-1/3 space-y-4">
//         <h2 className="text-xl font-semibold mb-4">Video List</h2>
//         <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-md p-2">
//           {Object.entries(groupedVideos).map(([parentTitle, childModules]) => (
//             <div key={parentTitle} className="mb-4 transition-all duration-300">
//               <h3
//                 onClick={() => toggleParentCollapse(parentTitle)}
//                 className="font-semibold text-gray-700 mb-2 cursor-pointer transition-all duration-300"
//               >
//                 {parentTitle} {collapsedParents[parentTitle] ? "▲" : "▼"}
//               </h3>
//               <div
//                 className={`${
//                   collapsedParents[parentTitle]
//                     ? "max-h-0 overflow-hidden"
//                     : "max-h-full"
//                 } transition-all duration-300`}
//               >
//                 {Object.entries(childModules).map(([childTitle, videos]) => (
//                   <div key={childTitle} className="ml-4 mb-2">
//                     <h4
//                       onClick={() => toggleChildCollapse(childTitle)}
//                       className="font-semibold text-gray-600 mb-1 cursor-pointer transition-all duration-300"
//                     >
//                       {childTitle} {collapsedChildren[childTitle] ? "▲" : "▼"}
//                     </h4>
//                     <div
//                       className={`${
//                         collapsedChildren[childTitle]
//                           ? "max-h-0 overflow-hidden"
//                           : "max-h-full"
//                       } transition-all duration-300`}
//                     >
//                       {videos?.map((videoItem: Video) => (
//                         <div
//                           key={videoItem.id}
//                           onClick={() => setSelectedVideo(videoItem)}
//                           className={`cursor-pointer p-4 mb-2 rounded-lg shadow-lg transition-all duration-300 ${
//                             selectedVideo && selectedVideo.id === videoItem.id
//                               ? "bg-blue-700 text-white font-bold"
//                               : "bg-white text-gray-800 hover:bg-blue-500 hover:text-white"
//                           }`}
//                         >
//                           <div className="flex justify-between items-center">
//                             <span className="text-lg font-semibold">
//                               {videoItem?.title}
//                             </span>
//                             <span className="text-sm text-gray-400">
//                               {videoItem?.duration}
//                             </span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeeClass;
import { useGetSingleVideoQuery } from "../../../redux/api/courseApi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SeeClassVideo from "./SeeClassVideo";

interface Video {
  id: number;
  title: string;
  video_url: string;
  duration: string;
  module_details: {
    title: string;
    course_details: {
      title: string;
      image: string;
      description: string;
      price: number;
      category_details: {
        id: number;
        category: string;
        slug: string;
      }[];
    };
    parent_module_details: {
      title: string;
    };
    description: string;
  };
}

interface GroupedVideos {
  [parentTitle: string]: {
    [childTitle: string]: Video[];
  };
}

const SeeClass: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: videoData,
    isLoading,
    error,
  } = useGetSingleVideoQuery(id as string);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [collapsedParents, setCollapsedParents] = useState<{
    [key: string]: boolean;
  }>({});
  const [collapsedChildren, setCollapsedChildren] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (videoData && videoData.data.length > 0) {
      setSelectedVideo(videoData.data[0]);
    }
  }, [videoData]);

  if (isLoading) return <p>Loading videos...</p>;
  if (error) return <p>Error loading videos</p>;
  if (!videoData || videoData.data.length === 0)
    return <p>No videos available</p>;

  const groupedVideos: GroupedVideos = videoData.data.reduce(
    (acc: GroupedVideos, video: Video) => {
      const parentTitle =
        video.module_details.parent_module_details.title || "Unknown Parent";
      const childTitle = video.module_details.title || "Unknown Child";

      if (!acc[parentTitle]) acc[parentTitle] = {};
      if (!acc[parentTitle][childTitle]) acc[parentTitle][childTitle] = [];

      acc[parentTitle][childTitle].push(video);
      return acc;
    },
    {} as GroupedVideos
  );

  const flattenedVideos = Object.values(groupedVideos).flatMap((childModules) =>
    Object.values(childModules).flat()
  ) as Video[];

  const currentIndex = selectedVideo
    ? flattenedVideos.findIndex((v) => v.id === selectedVideo.id)
    : -1;
  const hasNext = currentIndex < flattenedVideos.length - 1;
  const hasPrev = currentIndex > 0;

  const handleNext = () => {
    if (hasNext) setSelectedVideo(flattenedVideos[currentIndex + 1]);
  };

  const handlePrev = () => {
    if (hasPrev) setSelectedVideo(flattenedVideos[currentIndex - 1]);
  };

  const toggleParentCollapse = (parentTitle: string) => {
    setCollapsedParents((prev) => ({
      ...prev,
      [parentTitle]: !prev[parentTitle],
    }));
  };

  const toggleChildCollapse = (childTitle: string) => {
    setCollapsedChildren((prev) => ({
      ...prev,
      [childTitle]: !prev[childTitle],
    }));
  };

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
      <div className="flex-1">
        {selectedVideo && (
          <div className="space-y-4">
            <SeeClassVideo video={selectedVideo} />
            <div className="flex justify-end mt-4">
              <button
                onClick={handlePrev}
                disabled={!hasPrev}
                className={`px-3 py-2 rounded-lg mx-2 transition-colors ${
                  !hasPrev
                    ? "opacity-50 cursor-not-allowed bg-gray-300"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!hasNext}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  !hasNext
                    ? "opacity-50 cursor-not-allowed bg-gray-300"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 md:w-1/3 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Video List</h2>
        <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-md p-2">
          {Object.entries(groupedVideos).map(([parentTitle, childModules]) => (
            <div key={parentTitle} className="mb-4 transition-all duration-300">
              <h3
                onClick={() => toggleParentCollapse(parentTitle)}
                className="font-semibold text-gray-700 mb-2 cursor-pointer transition-all duration-300"
              >
                {parentTitle} {collapsedParents[parentTitle] ? "▲" : "▼"}
              </h3>
              <div
                className={`${
                  collapsedParents[parentTitle]
                    ? "max-h-0 overflow-hidden"
                    : "max-h-full"
                } transition-all duration-300`}
              >
                {Object.entries(childModules).map(([childTitle, videos]) => (
                  <div key={childTitle} className="ml-4 mb-2">
                    <h4
                      onClick={() => toggleChildCollapse(childTitle)}
                      className="font-semibold text-gray-600 mb-1 cursor-pointer transition-all duration-300"
                    >
                      {childTitle} {collapsedChildren[childTitle] ? "▲" : "▼"}
                    </h4>
                    <div
                      className={`${
                        collapsedChildren[childTitle]
                          ? "max-h-0 overflow-hidden"
                          : "max-h-full"
                      } transition-all duration-300`}
                    >
                      {videos?.map((videoItem: Video) => (
                        <div
                          key={videoItem.id}
                          onClick={() => setSelectedVideo(videoItem)}
                          className={`cursor-pointer p-4 mb-2 rounded-lg shadow-lg transition-all duration-300 ${
                            selectedVideo && selectedVideo.id === videoItem.id
                              ? "bg-blue-700 text-white font-bold"
                              : "bg-white text-gray-800 hover:bg-blue-500 hover:text-white"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">
                              {videoItem?.title}
                            </span>
                            <span className="text-sm text-gray-400">
                              {videoItem?.duration}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeeClass;
