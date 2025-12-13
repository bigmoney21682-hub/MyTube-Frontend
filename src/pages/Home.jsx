export default function Home() {
  return (
    <div style={{
      padding: "2rem",
      fontFamily: "system-ui, sans-serif",
      textAlign: "center",
      minHeight: "100vh",
      background: "#f0f0f0"
    }}>
      <h1 style={{ fontSize: "3rem", color: "#ff0000" }}>
        🎉 MyTube is ALIVE! 🎉
      </h1>
      <p style={{ fontSize: "1.5rem" }}>
        Deployment works perfectly!<br />
        White screen problem = SOLVED
      </p>
      <p>
        Next: Let's play a YouTube video →<br />
        Go to /#/watch/dQw4w9WgXcQ
      </p>
    </div>
  );
}
