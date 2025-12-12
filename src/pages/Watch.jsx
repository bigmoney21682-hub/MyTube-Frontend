import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Player from "../components/Player";

export default function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [stream, setStream] = useState("");

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        // Fetch video metadata from Render backend
        const videoResponse = await fetch(
          `https://mytube-backend-xlz4.onrender.com/video/${id}`
        );
        const videoData = await videoResponse.json();

        // Fetch stream URL from Render backend
        const streamResponse = await fetch(
          `https://mytube-backend-xlz4.onrender.com/streams/${id}`
        );
        const streamData = await streamResponse.json();

        setVideo(videoData);
        setStream(streamData.best);
      } catch (error) {
        console.error("Error fetching video or stream:", error);
      }
    })();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div>
      <Player streamUrl={stream} />
      <h1>{video.title}</h1>
      <p>{video.author}</p>
    </div>
  );
}
