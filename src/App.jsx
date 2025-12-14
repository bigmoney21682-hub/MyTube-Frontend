import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Watch from "./pages/Watch.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:videoId" element={<Watch />} />
      </Routes>
    </Router>
  );
}

export default App;
