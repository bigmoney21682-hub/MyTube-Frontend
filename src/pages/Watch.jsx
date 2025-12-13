import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Player from '../components/Player.jsx';
import VideoCard from '../components/VideoCard.jsx'; // Optional for related later

const BACKEND_URL = 'https://mytube-backend-xlz4.onrender.com';

const Watch = () => {
  // Support both /watch/:videoId and /watch?v=ID routes
  const { videoId: paramId } = useParams(); // for /watch/:videoId
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get('v'); // for ?v=ID

  const videoId = paramId || queryId;

  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoId) {
      setError('No video ID provided');
      setLoading(false);
      return;
    }

    fetch(`${BACKEND_URL}/video/${videoId}`)
      .then(res => {
        if (!res.ok) throw new Error('Video not found');
        return res.json();
      })
      .then(data => {
        setVideoData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [videoId]);

  if (!videoId) return <div style={{color: 'white', textAlign: 'center', marginTop: '100px'}}>Invalid video URL</div>;
  if (loading) return <div style={{color: 'white', textAlign: 'center', marginTop: '100px'}}>Loading video...</div>;
  if (error) return <div style={{color: 'white', textAlign: 'center', marginTop: '100px'}}>Error: {error}</div>;

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '20px',
      color: 'white',
      backgroundColor: '#0f0f0f',
      minHeight: '100vh'
    }}>
      {/* Main Player */}
      <div style={{ marginBottom: '30px' }}>
        <Player videoId={videoId} />
      </div>

      {/* Video Info */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '600',
          margin: '0 0 12px 0',
          lineHeight: '1.3'
        }}>
          {videoData.title}
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#aaa',
          fontSize: '16px'
        }}>
          <span>{videoData.uploader || 'Unknown channel'}</span>
          <span>•</span>
          <span>
            {videoData.view_count ? 
              `${Number(videoData.view_count).toLocaleString()} views` : 
              'Views unknown'}
          </span>
        </div>
      </div>

      {/* Placeholder for Related Videos (we'll fill this next) */}
      <div>
        <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>Related Videos</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px'
        }}>
          {/* Temporary placeholder cards */}
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{
              background: '#1a1a1a',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center'
            }}>
              Related video {i} coming soon...
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watch;
