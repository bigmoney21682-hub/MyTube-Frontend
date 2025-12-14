import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Watch from './pages/Watch.jsx';

export default function App() {
  return (
    <Router basename="/MyTube-Frontend">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:videoId" element={<Watch />} />
        {/* Add ?v= fallback if needed */}
        <Route path="/watch" element={<Watch />} />
      </Routes>
    </Router>
  );
}
