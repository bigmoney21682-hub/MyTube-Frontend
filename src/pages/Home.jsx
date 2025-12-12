// src/pages/Home.jsx
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import VideoCard from "../components/VideoCard";

export default function Home() {
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const res = await fetch(
        `https://mytube-backend-xlz4.onrender.com/search?q=${encodeURIComponent(query)}`
      );

      const data = await res.json();
      setResults(data); // backend returns array of search results
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <SearchBar onSearch={handleSearch} />

      <div style={{ marginTop: "20px" }}>
        {results.length === 0 ? (
          <p>Search for a video to begin!</p>
        ) : (
          results.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))
        )}
      </div>
    </div>
  );
}
