import { useEffect, useRef, useState } from 'react';

const Player = ({ videoId }) => {
  const videoRef = useRef(null);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) return;

    // Fetch video info from YOUR backend
    fetch(`https://your-backend.onrender.com/video/${videoId}`)
      .then(res => res.json())
      .then(data => {
        setVideoData(data);
        setLoading(false);

        const video = videoRef.current;
        if (!video) return;

        // Use hls.js if available and it's a DASH manifest (googlevideo)
        if (window.Hls && data.best_url.includes('googlevideo.com')) {
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(data.best_url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
          } else {
            // Fallback for Safari (native HLS support)
            video.src = data.best_url;
            video.play();
          }
        } else {
          // Progressive MP4 fallback
          video.src = data.best_url;
          video.play();
        }
      })
      .catch(err => {
        console.error('Failed to load video:', err);
        setLoading(false);
      });
  }, [videoId]);

  if (!videoId) return <p>No video ID</p>;
  if (loading) return <p>Loading video...</p>;

  return (
    <div style={{ aspectRatio: '16/9', background: '#000', borderRadius: '12px', overflow: 'hidden' }}>
      <video
        ref={videoRef}
        controls
        autoPlay
        playsInline
        poster={videoData?.thumbnail}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
};

export default Player;
