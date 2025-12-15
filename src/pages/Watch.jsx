useEffect(() => {
  (async () => {
    try {
      const res = await fetch(`${API_BASE}/video?id=${id}`);
      const data = await res.json();

      if (!data || !Array.isArray(data.formats)) throw new Error("Invalid video data");

      setVideo(data);

      const best = data.formats
        .filter(f => f.ext === "mp4" && f.vcodec !== "none")
        .sort((a, b) => (b.height || 0) - (a.height || 0))[0];

      if (!best?.url) throw new Error("No playable stream found");
      setStream(best.url);

      // Optional related videos (backend may not exist)
      try {
        const relRes = await fetch(`${API_BASE}/related?id=${id}`);
        if (relRes.ok) {
          const relData = await relRes.json();
          setRelated(relData);
        } else {
          console.warn("Related videos not available");
        }
      } catch (err) {
        console.warn("Related fetch failed", err);
      }

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  })();
}, [id]);
