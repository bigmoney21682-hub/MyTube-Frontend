import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Watch from './pages/Watch.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:videoId" element={<Watch />} />
        {/* Optional fallback for ?v= */}
        <Route path="/watch" element={<Watch />} />
      </Routes>
    </Router>
  );
}
