import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PlaylistProvider } from "./components/PlaylistContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlaylistProvider>
        <App />
      </PlaylistProvider>
    </BrowserRouter>
  </React.StrictMode>
);
