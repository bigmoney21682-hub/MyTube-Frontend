export default function Spinner() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem"
    }}>
      <div style={{
        width: 36,
        height: 36,
        border: "4px solid #333",
        borderTop: "4px solid #ff9800",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }} />
      <style>
        {`@keyframes spin {
          to { transform: rotate(360deg); }
        }`}
      </style>
    </div>
  );
}
