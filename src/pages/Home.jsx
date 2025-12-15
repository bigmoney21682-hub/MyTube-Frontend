import { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import VideoCard from "../components/VideoCard";
import { API_BASE } from "../config";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trendingPage, setTrendingPage] = useState(1);
  const trendingRef = useRef(null);

  // Search function
  async function search(q) {
    if (!q) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  }

  // Load trending
  async function loadTrending(page = 1) {
    try {
      const res = await fetch(`${API_BASE}/trending?page=${page}`);
      const data = await res.json();
      setTrending(prev => [...prev, ...data]);
      setTrendingPage(page + 1);
    } catch (err) {
      console.error("Trending load failed", err);
    }
  }

  // Infinite scroll
  useEffect(() => {
    loadTrending();
    function handleScroll() {
      if (!trendingRef.current) return;
      const rect = trendingRef.current.getBoundingClientRect();
      if (rect.bottom - window.innerHeight < 100) {
        loadTrending(trendingPage);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trendingPage]);

  return (
    <div>
      <div className="banner">
        <h1>MyTube GOD MODE</h1>
        <p>Ad-free, premium, ultra-fast streaming</p>
      </div>

      <SearchBar onSearch={search} />
      {loading && <p>Loading...</p>}

      <div className="grid">
        {videos.map(v => <VideoCard key={v.id} video={v} />)}
      </div>

      <h2>Trending</h2>
      <div className="grid" ref={trendingRef}>
        {trending.map(v => <VideoCard key={v.id} video={v} />)}
      </div>
    </div>
  );
}
