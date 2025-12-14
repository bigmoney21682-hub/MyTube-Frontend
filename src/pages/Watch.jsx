import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Player from "../components/Player";
import { API_BASE } from "../config";

export default function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [stream, setStream] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Missing video ID");
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/video?id=${id}`);
        const data = await res.json();

        if (!data || !Array.isArray(data.formats)) {
          throw new Error("Invalid video data");
        }

        setVideo(data);

        const best = data.formats
          .filter(f => f.ext === "mp4" && f.vcodec !== "none")
          .sort((a, b) => (b.height || 0) - (a.height || 0))[0];

        if (!best?.url) {
          throw new Error("No playable stream found");
        }

        setStream(best.url);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    })();
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!video) return <p>Loading...</p>;

  return (
    <div>
      <h2>{video.title}</h2>
      <Player src={stream} />
    </div>
  );
}
