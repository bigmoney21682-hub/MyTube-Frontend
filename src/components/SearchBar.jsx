import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div className="search-bar">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search YouTube..."
      />
      <button onClick={() => onSearch(query)}>Search</button>
    </div>
  );
}
