import { useState } from "react";
import SearchBar from "../components/SearchBar";
import VideoCard from "../components/VideoCard";

const API_KEY = "AIzaSyCWx93j-IQ9LiyUrh1rjtiLQEDIe1S-aXs"; // ← Paste your key here

export default function Home() {
  const [videos, setVideos] = useState([]);

  const handleSearch = async (query) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=12&key=${API_KEY}`
      );
      const data = await res.json();
      setVideos(data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "white" }}>
      <SearchBar onSearch={handleSearch} />
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        padding: "0 20px",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        {videos.map((video) => (
          <VideoCard key={video.id.videoId} video={video} />
        ))}
      </div>
    </div>
  );
}
