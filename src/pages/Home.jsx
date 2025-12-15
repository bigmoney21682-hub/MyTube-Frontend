import { useState } from "react";
import SearchBar from "../components/SearchBar";
import VideoCard from "../components/VideoCard";
import { API_BASE } from "../config";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  let controller;

  async function search(q) {
    if (!q || q.length < 2) return;

    if (controller) controller.abort();
    controller = new AbortController();

    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/search?q=${encodeURIComponent(q)}`,
        { signal: controller.signal }
      );

      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();
      setVideos(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Search failed", err);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="banner">
        <h1>MyTube GOD MODE</h1>
        <p>Ad-free, premium, ultra-fast streaming</p>
      </div>

      <SearchBar onSearch={search} />

      {loading && <p>Loading...</p>}

      <div className="grid">
        {videos.map(v => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </div>
  );
}
