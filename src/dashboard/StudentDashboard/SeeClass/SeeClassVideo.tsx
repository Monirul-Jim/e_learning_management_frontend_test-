// import YouTube from "react-youtube";

// interface Video {
//   video_url: string;
// }

// interface SeeClassVideoProps {
//   video: Video | null;
// }

// const SeeClassVideo: React.FC<SeeClassVideoProps> = ({ video }) => {
//   const getVideoId = (url: string | undefined) => {
//     if (!url) return null;
//     const urlParams = new URLSearchParams(new URL(url).search);
//     return urlParams.get("v");
//   };

//   const videoId = getVideoId(video?.video_url);

//   const opts = {
//     height: "390",
//     width: "640",
//     playerVars: {
//       autoplay: 1,
//     },
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       {videoId ? (
//         <YouTube videoId={videoId} opts={opts} />
//       ) : (
//         <p className="text-gray-500">Video URL not available</p>
//       )}
//     </div>
//   );
// };

// export default SeeClassVideo;
'use client';
import { motion } from 'framer-motion';
import { Play, AlertCircle, Loader } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

interface Video {
  video_url: string;
}

interface SeeClassVideoProps {
  video: Video | null;
}

export function SeeClassVideo({ video }: SeeClassVideoProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getVideoId = (url: string | undefined) => {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      return urlObj.searchParams.get("v");
    } catch {
      // Try extracting from different YouTube URL formats
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
      return match ? match[1] : null;
    }
  };

  const videoId = getVideoId(video?.video_url);

  const handleVideoLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (!video?.video_url || !videoId) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-12">
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Video Not Available</h3>
              <p className="text-muted-foreground">
                The video URL is not available or invalid for this lesson.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-video bg-background/20">
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="inline-block mb-4"
                  >
                    <Loader className="h-8 w-8 text-primary" />
                  </motion.div>
                  <p className="text-muted-foreground">Loading video...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
                <div className="text-center p-8">
                  <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Failed to Load Video</h3>
                  <p className="text-muted-foreground mb-4">
                    There was an error loading the video. Please try refreshing the page.
                  </p>
                  <Button 
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="border-primary/30 hover:bg-primary/10"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {/* YouTube Video Embed */}
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
              title="Course Video"
              className="w-full h-full rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={handleVideoLoad}
              onError={handleVideoError}
            />

            {/* Custom Play Button Overlay (shows before video loads) */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-6 bg-primary/90 backdrop-blur-sm rounded-full shadow-2xl cursor-pointer"
                >
                  <Play className="h-12 w-12 text-primary-foreground ml-1" />
                </motion.div>
              </div>
            )}

            {/* Video Controls Overlay (optional) */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-2">
                <div className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded-md">
                  <span className="text-sm text-foreground">HD Quality</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-background/90 backdrop-blur-sm hover:bg-background/95"
                >
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Information */}
      <Card className="bg-card/30 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Play className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Now Playing</p>
                <p className="text-xs text-muted-foreground">High Definition Quality</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Stream</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}