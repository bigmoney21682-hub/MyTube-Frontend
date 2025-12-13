export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(45deg, #ff006e, #fb5607)",
      color: "white",
      fontFamily: "system-ui, sans-serif",
      textAlign: "center",
      padding: "60px"
    }}>
      <h1 style={{ fontSize: "3.5rem" }}>🏠 MyTube Home</h1>
      <p style={{ fontSize: "2rem" }}>Welcome! Everything works perfectly.</p>
      <p style={{ fontSize: "1.6rem", marginTop: "50px" }}>
        Test the player → go to:<br />
        <a href="#/watch/dQw4w9WgXcQ" style={{ color: "#ffff00", fontSize: "1.8rem" }}>
          #/watch/dQw4w9WgXcQ
        </a>
      </p>
    </div>
  );
}
