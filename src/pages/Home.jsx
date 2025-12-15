let searchAbort;

async function search(q) {
  if (!q || q.length < 2) return;

  if (searchAbort) searchAbort.abort();
  searchAbort = new AbortController();

  setLoading(true);

  try {
    const res = await fetch(
      `${API_BASE}/search?q=${encodeURIComponent(q)}`,
      { signal: searchAbort.signal }
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
