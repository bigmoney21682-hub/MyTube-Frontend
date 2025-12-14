import { useLocation, useSearchParams } from 'react-router-dom'; // Add useLocation
import { useEffect, useState } from 'react';
import Player from '../components/Player.jsx';

const BACKEND_URL = 'https://mytube-backend-xlz4.onrender.com';

const Watch = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Parse videoId from hash path like #/watch/dQw4w9WgXcQ
  const hashPath = location.hash; // e.g., "#/watch/dQw4w9WgXcQ"
  const videoIdFromHash = hashPath.startsWith('#/watch/') ? hashPath.slice(8) : null;

  // Fallback for ?v= if needed
  const queryId = searchParams.get('v');

  const videoId = videoIdFromHash || queryId;

  // Rest of your code is the same (fetch, loading, error, success)
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
        if (!res.ok) {
          throw new Error(`Backend error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        setVideoData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch failed:', err);
        setError(err.message || 'Failed to load video data');
        setLoading(false);
      });
  }, [videoId]);

  if (loading) {
    return (
      <div style={{ color: 'white', textAlign: 'center', padding: '100px 20px', background: '#0f0f0f', minHeight: '100vh' }}>
        <h2>Loading video...</h2>
        <p>(First load may take 20–30s if backend is asleep on Render free tier)</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: 'white', textAlign: 'center', padding: '50px 20px', background: '#0f0f0f', minHeight: '100vh' }}>
        <h2 style={{ color: '#ff5555' }}>Error Loading Video</h2>
        <p style={{ fontSize: '18px', margin: '20px 0' }}>{error}</p>
        <p>
          Check backend status: {' '}
          <a href={BACKEND_URL} style={{ color: '#1e90ff' }} target="_blank" rel="noopener noreferrer">
            {BACKEND_URL}
          </a>
        </p>
        <p>Try refreshing or waiting 30s (Render free tier spins down).</p>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '20px',
      color: 'white',
      backgroundColor: '#0f0f0f',
      minHeight: '100vh'
    }}>
      <div style={{ marginBottom: '30px', borderRadius: '12px', overflow: 'hidden' }}>
        <Player videoId={videoId} />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '600',
          margin: '0 0 12px 0',
          lineHeight: '1.3'
        }}>
          {videoData?.title || 'Untitled Video'}
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#aaa',
          fontSize: '16px'
        }}>
          <span>{videoData?.uploader || 'Unknown channel'}</span>
          {videoData?.view_count && (
            <>
              <span>•</span>
              <span>{Number(videoData?.view_count).toLocaleString()} views</span>
            </>
          )}
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>Related Videos</h2>
        <p style={{ color: '#888' }}>Coming soon...</p>
      </div>
    </div>
  );
};

export default Watch;
