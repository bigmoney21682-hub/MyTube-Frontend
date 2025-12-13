import React from "react";
import ReactDOM from "react-dom/client";

const App = () => (
  <div style={{
    minHeight: "100vh",
    background: "linear-gradient(45deg, #ff006e, #fb5607)",
    color: "white",
    fontFamily: "system-ui, sans-serif",
    textAlign: "center",
    padding: "60px",
    fontSize: "1.2rem"
  }}>
    <h1 style={{ fontSize: "4rem", margin: "0 0 30px" }}>
      🟢 REACT BUNDLE SUCCESS! 🟢
    </h1>
    <p style={{ fontSize: "2rem" }}>
      If you see this pink/orange gradient → everything works!
    </p>
    <p style={{ fontSize: "1.6rem", marginTop: "50px" }}>
      White screen = gone forever.<br />
      Next step: Add routing + YouTube player.
    </p>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
