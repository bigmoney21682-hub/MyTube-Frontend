import { useParams } from "react-router-dom";
import Player from "../components/Player";

export default function Watch() {
  const { id } = useParams();

  if (!id) return <p>Invalid video</p>;

  return (
    <div>
      <h2>Now Playing</h2>
      <Player videoId={id} />
    </div>
  );
}
