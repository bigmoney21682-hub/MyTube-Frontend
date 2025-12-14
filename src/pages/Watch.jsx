import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Player from "../components/Player";
import { API_BASE } from "../config";

export default function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [stream, setStream] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_BASE}/video?id=${id}`);
      const data = await res.json();

      setVideo(data);

      // pick best progressive mp4 ≤1080p
      const best = data.formats
        .filter(f => f.ext === "mp4" && f.vcodec !== "none")
        .sort((a, b) => (b.height || 0) - (a.height || 0))[0];

      if (best?.url) setStream(best.url);
    })();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div>
      <h2>{video.title}</h2>
      <Player src={stream} />
    </div>
  );
}
