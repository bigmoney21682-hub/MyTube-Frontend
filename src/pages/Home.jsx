// Home.jsx snippet
const [trending, setTrending] = useState([]);
const [page, setPage] = useState(1);
const [loadingTrending, setLoadingTrending] = useState(false);

useEffect(() => {
  fetchTrending(page);
}, [page]);

async function fetchTrending(page) {
  setLoadingTrending(true);
  try {
    const res = await fetch(`${API_BASE}/trending?page=${page}`);
    const data = await res.json();
    setTrending(prev => [...prev, ...data]);
  } catch (err) {
    console.error(err);
  } finally {
    setLoadingTrending(false);
  }
}

// Infinite scroll listener
useEffect(() => {
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
      setPage(prev => prev + 1);
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
