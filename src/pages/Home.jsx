// src/pages/Home.jsx
import { useEffect, useState } from "react";
import Player from "../components/Player";

export default function Home() {
  const [video, setVideo] = useState(null);
  const [stream, setStream] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const videoResponse = await fetch(`https://mytube-backend-xlz4.onrender.com/video/test-id`);
        const videoData = await videoResponse.json();

        const streamResponse = await fetch(`https://mytube-backend-xlz4.onrender.com/streams/test-id`);
        const streamData = await streamResponse.json();

        setVideo(videoData);
        setStream(streamData.best);
      } catch (error) {
        console.error("Error fetching video or stream:", error);
      }
    })();
  }, []);

  if (!video) return <p>Loading...</p>;

  return (
    <div>
      <Player streamUrl={stream} />
      <h1>{video.title}</h1>
      <p>{video.author}</p>
    </div>
  );
}
