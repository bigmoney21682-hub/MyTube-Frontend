import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Player from "../components/Player";

export default function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [stream, setStream] = useState("");

  useEffect(() => {
    (async () => {
      const m = await fetch(`http://localhost:3000/video/${id}`).then((r) => r.json());
      const s = await fetch(`http://localhost:3000/streams/${id}`).then((r) => r.json());

      setVideo(m);
      setStream(s.best);
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
