import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Player from '../components/Player.jsx';

const BACKEND_URL = 'https://mytube-backend-xlz4.onrender.com';

const Watch = () => {
  const { videoId } = useParams();
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
    return (
      <div style={{ color: 'white', textAlign: 'center', padding: '100px', background: '#0f0f0f' }}>
        <h2>Loading video...</h2>
        <p>(First load may take 20–30s while backend wakes up)</p>
      </div>
    );
  }

  if (error || !videoId) {
    return (
      <div style={{ color: 'white', textAlign: 'center', padding: '50px', background: '#0f0f0f' }}>
        <h2 style={{ color: '#ff5555' }}>Error</h2>
        <p>{error || 'No video ID in URL'}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px', color: 'white', background: '#0f0f0f' }}>
      <div style={{ marginBottom: '30px' }}>
        <Player videoId={videoId} />
      </div>
      <h1 style={{ fontSize: '28px' }}>{videoData?.title || 'Untitled'}</h1>
      <p style={{ color: '#aaa' }}>{videoData?.uploader || 'Unknown'}</p>
    </div>
  );
};

export default Watch;
