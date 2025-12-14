import { useState } from "react";
import SearchBar from "../components/SearchBar";
import VideoCard from "../components/VideoCard";

const BACKEND_URL = "https://mytube-backend-xlz4.onrender.com";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error(err);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "white" }}>
      <SearchBar onSearch={handleSearch} />

      {loading && <p style={{ textAlign: "center", padding: "50px" }}>Loading results...</p>}

      {videos.length === 0 && !loading && <p style={{ textAlign: "center", padding: "50px" }}>No results — try searching something!</p>}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        padding: "20px",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
