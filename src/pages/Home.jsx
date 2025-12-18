// src/pages/Home.jsx

import { useEffect, useState } from "react";
import Header from "../components/Header";
import VideoCard from "../components/VideoCard";
import Spinner from "../components/Spinner"; // Full-screen spinner
import { API_BASE } from "../config";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [trending, setTrending] = useState([]);
  const [searching, setSearching] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false); // Controls full-screen spinner

  async function search(q) {
    if (!q.trim()) return;

    // Immediately show full-screen spinner and clear content
    setLoadingSearch(true);
    setSearching(true);
    setVideos([]);

    try {
      const res = await fetch(
        `${API_BASE}/search?q=${encodeURIComponent(q.trim())}`
      );
      const data = await res.json();

      setVideos(
        (data || []).filter(v => v?.id && v?.duration)
      );
    } catch (err) {
      console.error("Search failed:", err);
      setVideos([]);
    } finally {
      setLoadingSearch(false);
      setSearching(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/trending`);
        const data = await res.json();

        setTrending(
          (data || []).filter(v => v?.id && v?.duration)
        );
      } catch {
        setTrending([]);
      }
    })();
  }, []);

  const list = videos.length > 0 ? videos : trending;

  return (
    <div>
      {/* Full-screen spinner overlay when searching */}
      {loadingSearch && <Spinner />}

      <Header onSearch={search} />

      {/* Only show Trending title if no search results */}
      {videos.length === 0 && !loadingSearch && (
        <h3 style={{ padding: "1rem", opacity: 0.8 }}>
          👀 Trending
        </h3>
      )}

      {/* Video grid */}
      <div className="grid">
        {list.map(v => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>

      {/* Optional empty state */}
      {!loadingSearch && list.length === 0 && (
        <p style={{ textAlign: "center", padding: "2rem", opacity: 0.7 }}>
          No videos found.
        </p>
      )}
    </div>
  );
}
