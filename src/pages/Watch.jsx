import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Player from '../components/Player.jsx';

const BACKEND_URL = 'https://mytube-backend-xlz4.onrender.com';

const Watch = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Parse from hash #/watch/dQw4w9WgXcQ
  const hash = location.hash; // e.g. "#/watch/dQw4w9WgXcQ"
  const videoIdFromHash = hash.startsWith('#/watch/') ? hash.slice(8) : null;

  // Fallback for ?v=ID
  const videoIdFromQuery = searchParams.get('v');

  const videoId = videoIdFromHash || videoIdFromQuery;

  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoId) {
      setError('No video ID in URL');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${BACKEND_URL}/video/${videoId}`)
      .then(res => {
        if (!res.ok) throw new Error(`Backend error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setVideoData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load video');
        setLoading(false);
      });
  }, [videoId]);

  if (loading) {
    return <div style={{ color: 'white', textAlign: 'center', padding: '100px', background: '#0f0f0f' }}>
      <h2>Loading video...</h2>
      <p>(First load may take 20–30s while backend wakes up)</p>
    </div>;
  }

  if (error) {
    return <div style={{ color: 'white', textAlign: 'center', padding: '50px', background: '#0f0f0f' }}>
      <h2 style={{ color: '#ff5555' }}>Error</h2>
      <p>{error}</p>
      <p>Backend: <a href={BACKEND_URL} style={{ color: '#1e90ff' }}>{BACKEND_URL}</a></p>
    </div>;
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px', color: 'white', background: '#0f0f0f' }}>
      <div style={{ marginBottom: '30px' }}>
        <Player videoId={videoId} />
      </div>

      <h1 style={{ fontSize: '28px' }}>{videoData?.title || 'Untitled'}</h1>
      <p style={{ color: '#aaa' }}>{videoData?.uploader || 'Unknown'}</p>

      <div style={{ marginTop: '50px' }}>
        <h2>Related Videos</h2>
        <p>Coming soon...</p>
      </div>
    </div>
  );
};

export default Watch;
