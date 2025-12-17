// src/pages/Home.jsx

import { useEffect, useState } from "react";
import Header from "../components/Header";
import VideoCard from "../components/VideoCard";
import Spinner from "../components/Spinner";
import { API_BASE } from "../config";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  async function search(q) {
    if (!q) return;

    // ENTER SEARCH MODE
    setSearching(true);
    setLoading(true);
    setVideos([]);

    try {
      const res = await fetch(
        `${API_BASE}/search?q=${encodeURIComponent(q)}`
      );
      const data = await res.json();

      setVideos(
        (data || []).filter(v => v?.id && v?.duration)
      );
    } catch {
      setVideos([]);
    } finally {
      setLoading(false);
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

  /* ======================
     SEARCH LOADING STATE
     ====================== */
  if (searching && loading) {
    return (
      <div>
        <Header onSearch={search} />

        <div
          style={{
            height: "70vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <Spinner />
          <p style={{ opacity: 0.85 }}>Searching…</p>
        </div>
      </div>
    );
  }

  const list = videos.length > 0 ? videos : trending;

  return (
    <div>
      <Header onSearch={search} />

      {videos.length === 0 && (
        <h3 style={{ padding: "1rem", opacity: 0.8 }}>
          👀 Trending
        </h3>
      )}

      <div className="grid">
        {list.map(v => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </div>
  );
}
