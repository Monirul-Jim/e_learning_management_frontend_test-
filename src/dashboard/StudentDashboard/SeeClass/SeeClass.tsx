import { useGetSingleVideoQuery } from "../../../redux/api/courseApi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SeeClassVideo from "./SeeClassVideo";

interface Video {
  id: number;
  title: string;
  video_url: string;
  module: {
    title: string;
    parent_module: {
      title: string;
    } | null;
  } | null;
}

interface VideoData {
  data: Video[];
}

const SeeClass = () => {
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

  const groupedVideos = videoData.data.reduce((acc, video) => {
    const parentTitle = video.module?.parent_module?.title || "Unknown Parent";
    const childTitle = video.module?.title || "Unknown Child";

    if (!acc[parentTitle]) acc[parentTitle] = {};
    if (!acc[parentTitle][childTitle]) acc[parentTitle][childTitle] = [];

    acc[parentTitle][childTitle].push(video);
    return acc;
  }, {} as { [parentTitle: string]: { [childTitle: string]: Video[] } });

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
    <div className="flex flex-col md:flex-row">
      <div className="flex-1">
        {selectedVideo && <SeeClassVideo video={selectedVideo} />}
      </div>

      <div className="flex-1 md:w-1/3 space-y-4 p-4">
        <h2 className="text-xl font-semibold mb-4">Video List</h2>
        {Object.entries(groupedVideos).map(([parentTitle, childModules]) => (
          <div key={parentTitle} className="mb-4">
            <h3
              onClick={() => toggleParentCollapse(parentTitle)}
              className="text-lg font-semibold text-gray-700 mb-2 cursor-pointer"
            >
              {parentTitle} {collapsedParents[parentTitle] ? "▲" : "▼"}
            </h3>
            {!collapsedParents[parentTitle] &&
              Object.entries(childModules).map(([childTitle, videos]) => (
                <div key={childTitle} className="ml-4 mb-2">
                  <h4
                    onClick={() => toggleChildCollapse(childTitle)}
                    className="text-md font-semibold text-gray-600 mb-1 cursor-pointer"
                  >
                    {childTitle} {collapsedChildren[childTitle] ? "▲" : "▼"}
                  </h4>
                  {!collapsedChildren[childTitle] &&
                    videos?.map((videoItem) => (
                      <p
                        key={videoItem.id}
                        onClick={() => setSelectedVideo(videoItem)}
                        className={`cursor-pointer bg-sky-500 text-white p-1 mt-2 rounded-lg ${
                          selectedVideo && selectedVideo.id === videoItem.id
                            ? "text-blue-500 font-bold"
                            : ""
                        }`}
                      >
                        {videoItem.title}
                      </p>
                    ))}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeClass;
