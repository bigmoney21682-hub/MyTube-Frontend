export default function Home() {
  return (
    <div style={{
      padding: "40px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      textAlign: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #ff6b6b, #f06595)",
      color: "white"
    }}>
      <h1 style={{ fontSize: "4rem", marginBottom: "20px" }}>
        🎉 MYTUBE IS WORKING! 🎉
      </h1>
      <p style={{ fontSize: "2rem" }}>
        If you see this colorful page → everything is fixed!
      </p>
      <p style={{ fontSize: "1.5rem", marginTop: "40px" }}>
        Next: Go to → #/watch/dQw4w9WgXcQ<br />
        to test video playback
      </p>
    </div>
  );
}
