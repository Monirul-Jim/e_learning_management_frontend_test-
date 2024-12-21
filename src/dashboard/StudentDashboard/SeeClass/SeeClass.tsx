// import {
//   useGetQuizzesQuery,
//   useGetSingleVideoQuery,
// } from "../../../redux/api/courseApi";
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

// interface GroupedVideos {
//   [parentTitle: string]: {
//     [childTitle: string]: Video[];
//   };
// }
// interface QuizOption {
//   text: string; // Text for each quiz option
// }

// interface QuizQuestions {
//   options: QuizOption[]; // Array of options for the quiz
//   correctAnswer: string; // Identifier for the correct answer (e.g., "b")
// }

// interface Quiz {
//   id: number; // Unique identifier for the quiz
//   module: number; // Module ID the quiz belongs to
//   module_title: string; // Title of the module
//   title: string; // Title of the quiz
//   questions: QuizQuestions; // Object containing the questions and correct answer
// }

// const SeeClass: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [moduleTitle, setModuleTitle] = useState<string | null>(null);

//   const {
//     data: videoData,
//     isLoading,
//     error,
//   } = useGetSingleVideoQuery(id as string);
//   const {
//     data: qData,
//     isLoading: qLoading,
//     isError: qError,
//   } = useGetQuizzesQuery(moduleTitle);

//   const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
//   const [collapsedParents, setCollapsedParents] = useState<{
//     [key: string]: boolean;
//   }>({});
//   const [collapsedChildren, setCollapsedChildren] = useState<{
//     [key: string]: boolean;
//   }>({});

//   useEffect(() => {
//     if (videoData && videoData?.data?.length > 0) {
//       setSelectedVideo(videoData?.data[0]);
//       setModuleTitle(videoData?.data[0]?.module_details?.title);
//     }
//   }, [videoData]);

//   if (isLoading) return <p>Loading videos...</p>;
//   if (error) return <p>Error loading videos</p>;
//   if (!videoData || videoData.data.length === 0)
//     return <p>No videos available</p>;

//   const groupedVideos: GroupedVideos = videoData.data.reduce(
//     (acc: GroupedVideos, video: Video) => {
//       const parentTitle =
//         video.module_details.parent_module_details.title || "Unknown Parent";
//       const childTitle = video.module_details.title || "Unknown Child";

//       if (!acc[parentTitle]) acc[parentTitle] = {};
//       if (!acc[parentTitle][childTitle]) acc[parentTitle][childTitle] = [];

//       acc[parentTitle][childTitle].push(video);
//       return acc;
//     },
//     {} as GroupedVideos
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

//       {/* <div className="flex-1 md:w-1/3 space-y-4">
//         <h2 className="text-xl font-semibold mb-4">Video List</h2>
//         <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-md p-2">
//           {Object.entries(groupedVideos).map(([parentTitle, childModules]) => (
//             <div key={parentTitle} className="mb-4 transition-all duration-300">
//               <h3
//                 onClick={() => toggleParentCollapse(parentTitle)}
//                 className="font-semibold text-gray-700 mb-3 cursor-pointer transition-all duration-300"
//               >
//                 <span className="text-2xl">{parentTitle}</span>{" "}
//                 {collapsedParents[parentTitle] ? "▲" : "▼"}
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
//                       className="font-semibold text-gray-600 mb-3 cursor-pointer transition-all duration-300"
//                     >
//                       <span className="text-xl">{childTitle}</span>{" "}
//                       {collapsedChildren[childTitle] ? "▲" : "▼"}
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
//       </div> */}
//       <div className="flex-1 md:w-1/3 space-y-4">
//         <h2 className="text-xl font-semibold mb-4">Video List</h2>
//         <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-md p-2">
//           {Object.entries(groupedVideos).map(([parentTitle, childModules]) => (
//             <div key={parentTitle} className="mb-4 transition-all duration-300">
//               <h3
//                 onClick={() => toggleParentCollapse(parentTitle)}
//                 className="font-semibold text-gray-700 mb-3 cursor-pointer transition-all duration-300"
//               >
//                 <span className="text-2xl">{parentTitle}</span>{" "}
//                 {collapsedParents[parentTitle] ? "▲" : "▼"}
//               </h3>
//               <div
//                 className={`${
//                   collapsedParents[parentTitle]
//                     ? "max-h-0 overflow-hidden"
//                     : "max-h-full"
//                 } transition-all duration-300`}
//               >
//                 {Object.entries(childModules).map(([childTitle, videos]) => {
//                   // Filter quizzes related to the current childTitle
//                   const relatedQuizzes = qData?.data.filter(
//                     (quiz: Quiz) => quiz.module_title === childTitle
//                   );

//                   return (
//                     <div key={childTitle} className="ml-4 mb-2">
//                       <h4
//                         onClick={() => toggleChildCollapse(childTitle)}
//                         className="font-semibold text-gray-600 mb-3 cursor-pointer transition-all duration-300"
//                       >
//                         <span className="text-xl">{childTitle}</span>{" "}
//                         {collapsedChildren[childTitle] ? "▲" : "▼"}
//                       </h4>
//                       <div
//                         className={`${
//                           collapsedChildren[childTitle]
//                             ? "max-h-0 overflow-hidden"
//                             : "max-h-full"
//                         } transition-all duration-300`}
//                       >
//                         {/* Render videos for this child module */}
//                         {videos?.length > 0 &&
//                           videos.map((videoItem: Video, index) => (
//                             <div key={videoItem.id}>
//                               <div
//                                 onClick={() => setSelectedVideo(videoItem)}
//                                 className={`cursor-pointer p-4 mb-2 rounded-lg shadow-lg transition-all duration-300 ${
//                                   selectedVideo &&
//                                   selectedVideo.id === videoItem.id
//                                     ? "bg-blue-700 text-white font-bold"
//                                     : "bg-white text-gray-800 hover:bg-blue-500 hover:text-white"
//                                 }`}
//                               >
//                                 <div className="flex justify-between items-center">
//                                   <span className="text-lg font-semibold">
//                                     {videoItem?.title}
//                                   </span>
//                                   <span className="text-sm text-gray-400">
//                                     {videoItem?.duration}
//                                   </span>
//                                 </div>
//                               </div>

//                               {/* Show "Take Quiz" button only for the last video and if quizzes are available */}
//                               {index === videos.length - 1 &&
//                                 relatedQuizzes?.length > 0 && (
//                                   <div className="mt-4">
//                                     <button
//                                       onClick={() =>
//                                         console.log(
//                                           `Take Quiz for module: ${childTitle}`
//                                         )
//                                       }
//                                       className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all"
//                                     >
//                                       Take Quiz
//                                     </button>
//                                   </div>
//                                 )}
//                             </div>
//                           ))}
//                         {/* Show a message if no videos or quizzes are available */}
//                         {videos?.length === 0 &&
//                           relatedQuizzes?.length === 0 && (
//                             <p>
//                               No videos or quizzes available for this module.
//                             </p>
//                           )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeeClass;

import {
  useGetQuizzesQuery,
  useGetSingleVideoQuery,
} from "../../../redux/api/courseApi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SeeClassVideo from "./SeeClassVideo";
import QuizSection from "./QuizSection";

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
export interface Quiz {
  id: number;
  module: number;
  module_title: string;
  title: string;
  questions: {
    options: { text: string }[];
    correctAnswer: string;
  };
}

const SeeClass: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [moduleTitle, setModuleTitle] = useState<string | null>(null);
  const [collapsedParents, setCollapsedParents] = useState<{
    [key: string]: boolean;
  }>({});
  const [collapsedChildren, setCollapsedChildren] = useState<{
    [key: string]: boolean;
  }>({});

  const {
    data: videoData,
    isLoading,
    error,
  } = useGetSingleVideoQuery(id as string);
  const { data: qData } = useGetQuizzesQuery(moduleTitle);

  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<Quiz[] | null>(null);

  useEffect(() => {
    if (videoData && videoData?.data?.length > 0) {
      setSelectedVideo(videoData?.data[0]);
      setModuleTitle(videoData?.data[0]?.module_details?.title);
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

  const handleTakeQuiz = (quiz: Quiz[]) => {
    setQuizData(quiz);
    setShowQuiz(true);
  };

  const handleBackToVideo = () => {
    setShowQuiz(false);
  };

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
      <div className="flex-1">
        {!showQuiz ? (
          selectedVideo && (
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
          )
        ) : (
          <div>
            {quizData ? (
              <QuizSection data={quizData} onBack={handleBackToVideo} />
            ) : (
              <p>No quiz data available</p>
            )}
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
                className="font-semibold text-gray-700 mb-3 cursor-pointer transition-all duration-300"
              >
                <span className="text-2xl">{parentTitle}</span>{" "}
                {collapsedParents[parentTitle] ? "▲" : "▼"}
              </h3>
              <div
                className={`${
                  collapsedParents[parentTitle]
                    ? "max-h-0 overflow-hidden"
                    : "max-h-full"
                } transition-all duration-300`}
              >
                {Object.entries(childModules).map(([childTitle, videos]) => {
                  const relatedQuizzes = qData?.data.filter(
                    (quiz: Quiz) => quiz.module_title === childTitle
                  );

                  return (
                    <div key={childTitle} className="ml-4 mb-2">
                      <h4
                        onClick={() => toggleChildCollapse(childTitle)}
                        className="font-semibold text-gray-600 mb-3 cursor-pointer transition-all duration-300"
                      >
                        <span className="text-xl">{childTitle}</span>{" "}
                        {collapsedChildren[childTitle] ? "▲" : "▼"}
                      </h4>
                      <div
                        className={`${
                          collapsedChildren[childTitle]
                            ? "max-h-0 overflow-hidden"
                            : "max-h-full"
                        } transition-all duration-300`}
                      >
                        {videos?.map((videoItem: Video, index) => (
                          <div key={videoItem.id}>
                            <div
                              onClick={() => setSelectedVideo(videoItem)}
                              className={`cursor-pointer p-4 mb-2 rounded-lg shadow-lg transition-all duration-300 ${
                                selectedVideo &&
                                selectedVideo.id === videoItem.id
                                  ? "bg-blue-700 text-white font-bold"
                                  : "bg-white text-gray-800 hover:bg-blue-500 hover:text-white"
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">
                                  {videoItem.title}
                                </span>
                                <span className="text-sm text-gray-400">
                                  {videoItem.duration}
                                </span>
                              </div>
                            </div>
                            {index === videos.length - 1 &&
                              relatedQuizzes?.length > 0 && (
                                <div className="mt-4">
                                  <button
                                    onClick={() => {
                                      handleTakeQuiz(relatedQuizzes);
                                    }}
                                    className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                                  >
                                    Take Quiz
                                  </button>
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeeClass;
