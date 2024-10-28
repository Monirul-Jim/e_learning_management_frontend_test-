import YouTube from "react-youtube";

interface Video {
  video_url: string;
}

interface SeeClassVideoProps {
  video: Video | null;
}

const SeeClassVideo: React.FC<SeeClassVideoProps> = ({ video }) => {
  const getVideoId = (url: string | undefined) => {
    if (!url) return null;
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("v");
  };

  const videoId = getVideoId(video?.video_url);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {videoId ? (
        <YouTube videoId={videoId} opts={opts} />
      ) : (
        <p className="text-gray-500">Video URL not available</p>
      )}
    </div>
  );
};

export default SeeClassVideo;
