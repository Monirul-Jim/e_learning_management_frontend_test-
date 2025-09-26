'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Play,
  ChevronDown, 
  ChevronUp, 
  Clock, 
  BookOpen, 
  PlayCircle,
  Award,
  SkipForward,
  SkipBack
} from 'lucide-react';
// import { SeeClassVideo } from './SeeClassVideo';
// import { QuizSection } from './QuizSection';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';
import { Button } from '../../../components/ui/button';
import { SeeClassVideo } from './SeeClassVideo';
import {QuizSection} from './QuizSection';
import { useParams } from 'react-router-dom';
import { useGetQuizzesQuery, useGetSingleVideoQuery } from '../../../redux/api/courseApi';

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

export function SeeClass() {
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
  useEffect(() => {
    if (selectedVideo) {
      setModuleTitle(selectedVideo.module_details?.title);
    }
  }, [selectedVideo]);

  // const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  // const [showQuiz, setShowQuiz] = useState<boolean>(false);
  // const [quizData, setQuizData] = useState<Quiz[] | null>(null);
  // const [moduleTitle, setModuleTitle] = useState<string | null>(null);
  // const [collapsedParents, setCollapsedParents] = useState<{ [key: string]: boolean }>({});
  // const [collapsedChildren, setCollapsedChildren] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (videoData && videoData?.data?.length > 0) {
      setSelectedVideo(videoData?.data[0]);
      setModuleTitle(videoData?.data[0]?.module_details?.title);
    }
  }, [videoData]);

  useEffect(() => {
    if (selectedVideo) {
      setModuleTitle(selectedVideo.module_details?.title);
    }
  }, [selectedVideo]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <PlayCircle className="h-12 w-12 text-primary mb-4" />
            </motion.div>
            <h2 className="text-2xl font-semibold mb-2">Loading Course Content</h2>
            <p className="text-muted-foreground">Preparing your learning experience...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 relative z-10">
          <Card className="max-w-md mx-auto bg-card/50 backdrop-blur-sm border-destructive/20">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h2 className="text-2xl font-semibold text-destructive mb-4">Error Loading Course</h2>
              <p className="text-muted-foreground">Unable to load course content. Please try again.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!videoData || videoData.data.length === 0) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 relative z-10">
          <Card className="max-w-md mx-auto bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">📹</div>
              <h2 className="text-2xl font-semibold mb-4">No Videos Available</h2>
              <p className="text-muted-foreground">This course doesn't have any video content yet.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const groupedVideos: GroupedVideos = videoData.data.reduce(
    (acc: GroupedVideos, video: Video) => {
      const parentTitle = video.module_details.parent_module_details.title || "Unknown Parent";
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

  const currentIndex = selectedVideo ? flattenedVideos.findIndex((v) => v.id === selectedVideo.id) : -1;
  const hasNext = currentIndex < flattenedVideos.length - 1;
  const hasPrev = currentIndex > 0;
  const progress = ((currentIndex + 1) / flattenedVideos.length) * 100;

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-secondary/3 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content - Video/Quiz */}
          <div className="xl:col-span-2 space-y-6">
            {/* Course Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-card/30 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold text-foreground">
                        {selectedVideo?.module_details?.course_details?.title}
                      </h1>
                      <p className="text-muted-foreground">
                        {selectedVideo?.module_details?.parent_module_details?.title}
                      </p>
                    </div>
                    <Badge className="bg-primary/10 text-primary">
                      {currentIndex + 1} of {flattenedVideos.length}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Course Progress</span>
                      <span className="text-primary font-medium">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Video/Quiz Content */}
            {!showQuiz ? (
              selectedVideo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  {/* Current Video Title */}
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <PlayCircle className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold text-foreground">
                          {selectedVideo.title}
                        </h2>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{selectedVideo.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{selectedVideo.module_details.title}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Video Player */}
                  <SeeClassVideo video={selectedVideo} />

                  {/* Navigation Controls */}
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <Button
                          onClick={handlePrev}
                          disabled={!hasPrev}
                          variant={hasPrev ? "default" : "secondary"}
                          className="flex items-center gap-2"
                        >
                          <SkipBack className="h-4 w-4" />
                          Previous Lesson
                        </Button>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{currentIndex + 1}</span>
                          <span>/</span>
                          <span>{flattenedVideos.length}</span>
                        </div>

                        <Button
                          onClick={handleNext}
                          disabled={!hasNext}
                          variant={hasNext ? "default" : "secondary"}
                          className="flex items-center gap-2"
                        >
                          Next Lesson
                          <SkipForward className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {quizData ? (
                  <QuizSection data={quizData} onBack={handleBackToVideo} />
                ) : (
                  <Card className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                      <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Quiz Available</h3>
                      <p className="text-muted-foreground">
                        Quiz data is not available for this module.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}
          </div>

          {/* Sidebar - Course Content */}
          <div className="xl:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sticky top-8"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Course Content</h3>
                  </div>

                  <div className="max-h-[70vh] overflow-y-auto space-y-4 pr-2">
                    {Object.entries(groupedVideos).map(([parentTitle, childModules]) => (
                      <div key={parentTitle} className="space-y-2">
                        <button
                          onClick={() => toggleParentCollapse(parentTitle)}
                          className="flex items-center justify-between w-full p-3 bg-muted/20 hover:bg-muted/30 rounded-lg transition-colors duration-200 group"
                        >
                          <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {parentTitle}
                          </span>
                          {collapsedParents[parentTitle] ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>

                        {!collapsedParents[parentTitle] && (
                          <div className="ml-4 space-y-2">
                            {Object.entries(childModules).map(([childTitle, videos]) => {
                              const relatedQuizzes = qData?.data.filter(
                                (quiz: Quiz) => quiz.module_title === childTitle
                              );

                              return (
                                <div key={childTitle} className="space-y-1">
                                  <button
                                    onClick={() => toggleChildCollapse(childTitle)}
                                    className="flex items-center justify-between w-full p-2 bg-muted/10 hover:bg-muted/20 rounded-md transition-colors duration-200 group text-left"
                                  >
                                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                      {childTitle}
                                    </span>
                                    {collapsedChildren[childTitle] ? (
                                      <ChevronUp className="h-3 w-3 text-muted-foreground" />
                                    ) : (
                                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                    )}
                                  </button>

                                  {!collapsedChildren[childTitle] && (
                                    <div className="ml-4 space-y-1">
                                      {videos.map((videoItem: Video, index) => (
                                        <div key={videoItem.id} className="space-y-1">
                                          <button
                                            onClick={() => setSelectedVideo(videoItem)}
                                            className={`w-full p-3 rounded-md transition-all duration-200 text-left group ${
                                              selectedVideo?.id === videoItem.id
                                                ? "bg-primary/10 text-primary border-l-2 border-primary"
                                                : "bg-muted/5 hover:bg-muted/10 text-muted-foreground hover:text-foreground"
                                            }`}
                                          >
                                            <div className="flex items-center justify-between">
                                              <span className="text-sm font-medium flex items-center gap-2">
                                                {selectedVideo?.id === videoItem.id ? (
                                                  <PlayCircle className="h-4 w-4" />
                                                ) : (
                                                  <Play className="h-3 w-3" />
                                                )}
                                                {videoItem.title}
                                              </span>
                                              <div className="flex items-center gap-1 text-xs opacity-60">
                                                <Clock className="h-3 w-3" />
                                                {videoItem.duration}
                                              </div>
                                            </div>
                                          </button>

                                          {index === videos.length - 1 && relatedQuizzes?.length > 0 && (
                                            <button
                                              onClick={() => handleTakeQuiz(relatedQuizzes)}
                                              className="w-full p-3 rounded-md bg-secondary/10 hover:bg-secondary/20 text-secondary hover:text-secondary/80 transition-all duration-200 text-left group"
                                            >
                                              <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium flex items-center gap-2">
                                                  <Award className="h-4 w-4" />
                                                  Take Quiz
                                                </span>
                                                <Badge variant="secondary" className="text-xs">
                                                  {relatedQuizzes.length} question{relatedQuizzes.length !== 1 ? 's' : ''}
                                                </Badge>
                                              </div>
                                            </button>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}


// import {
//   useGetQuizzesQuery,
//   useGetSingleVideoQuery,
// } from "../../../redux/api/courseApi";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import SeeClassVideo from "./SeeClassVideo";
// import QuizSection from "./QuizSection";

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
// export interface Quiz {
//   id: number;
//   module: number;
//   module_title: string;
//   title: string;
//   questions: {
//     options: { text: string }[];
//     correctAnswer: string;
//   };
// }

// const SeeClass: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [moduleTitle, setModuleTitle] = useState<string | null>(null);
//   const [collapsedParents, setCollapsedParents] = useState<{
//     [key: string]: boolean;
//   }>({});
//   const [collapsedChildren, setCollapsedChildren] = useState<{
//     [key: string]: boolean;
//   }>({});

//   const {
//     data: videoData,
//     isLoading,
//     error,
//   } = useGetSingleVideoQuery(id as string);
//   const { data: qData } = useGetQuizzesQuery(moduleTitle);

//   const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
//   const [showQuiz, setShowQuiz] = useState<boolean>(false);
//   const [quizData, setQuizData] = useState<Quiz[] | null>(null);

//   useEffect(() => {
//     if (videoData && videoData?.data?.length > 0) {
//       setSelectedVideo(videoData?.data[0]);
//       setModuleTitle(videoData?.data[0]?.module_details?.title);
//     }
//   }, [videoData]);
//   useEffect(() => {
//     if (selectedVideo) {
//       setModuleTitle(selectedVideo.module_details?.title);
//     }
//   }, [selectedVideo]);

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

//   const handleTakeQuiz = (quiz: Quiz[]) => {
//     setQuizData(quiz);
//     setShowQuiz(true);
//   };

//   const handleBackToVideo = () => {
//     setShowQuiz(false);
//   };

//   return (
//     <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
//       <div className="flex-1">
//         {!showQuiz ? (
//           selectedVideo && (
//             <div className="space-y-4">
//               <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6 animate__animated animate__fadeInUp">
//                 {selectedVideo?.title}
//               </h1>

//               <SeeClassVideo video={selectedVideo} />
//               <div className="flex justify-end mt-4">
//                 <button
//                   onClick={handlePrev}
//                   disabled={!hasPrev}
//                   className={`px-3 py-2 rounded-lg mx-2 transition-colors ${
//                     !hasPrev
//                       ? "opacity-50 cursor-not-allowed bg-gray-300"
//                       : "bg-blue-500 text-white hover:bg-blue-600"
//                   }`}
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   disabled={!hasNext}
//                   className={`px-3 py-2 rounded-lg transition-colors ${
//                     !hasNext
//                       ? "opacity-50 cursor-not-allowed bg-gray-300"
//                       : "bg-blue-500 text-white hover:bg-blue-600"
//                   }`}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )
//         ) : (
//           <div>
//             {quizData ? (
//               <QuizSection data={quizData} onBack={handleBackToVideo} />
//             ) : (
//               <p>No quiz data available</p>
//             )}
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
//                         {videos?.map((videoItem: Video, index) => (
//                           <div key={videoItem.id}>
//                             <div
//                               onClick={() => setSelectedVideo(videoItem)}
//                               className={`cursor-pointer p-4 mb-2 rounded-lg shadow-lg transition-all duration-300 ${
//                                 selectedVideo &&
//                                 selectedVideo.id === videoItem.id
//                                   ? "bg-blue-700 text-white font-bold"
//                                   : "bg-white text-gray-800 hover:bg-blue-500 hover:text-white"
//                               }`}
//                             >
//                               <div className="flex justify-between items-center">
//                                 <span className="text-lg font-semibold">
//                                   {videoItem.title}
//                                 </span>
//                                 <span className="text-sm text-gray-400">
//                                   {videoItem.duration}
//                                 </span>
//                               </div>
//                             </div>

//                             {index === videos.length - 1 &&
//                               relatedQuizzes?.length > 0 && (
//                                 <div
//                                   onClick={() => {
//                                     handleTakeQuiz(relatedQuizzes);
//                                   }}
//                                   className={`cursor-pointer mt-2 flex justify-between items-center p-4 rounded-lg transition-all duration-300 ${
//                                     selectedVideo &&
//                                     selectedVideo.id === videoItem.id
//                                       ? "bg-blue-700 text-white font-bold"
//                                       : "bg-white text-gray-800 hover:bg-blue-500 hover:text-white"
//                                   }`}
//                                 >
//                                   <span className="text-lg font-semibold">
//                                     Take Quiz
//                                   </span>
//                                   <span className="text-sm text-gray-400">
//                                     Quiz Available
//                                   </span>
//                                 </div>
//                               )}
//                           </div>
//                         ))}
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
