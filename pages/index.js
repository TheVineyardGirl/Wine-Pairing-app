import { useState } from "react";

export default function Home() {
  const [food, setFood] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPairing = async () => {
    if (!food) return;
    setLoading(true);

    const res = await fetch("/api/pairing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ food }),
    });

    const data = await res.json();
    setResults(data.pairing.split("\n"));
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🍷 Wine Pairing App</h1>

      <input
        value={food}
        onChange={(e) => setFood(e.target.value)}
        placeholder="Enter food"
      />

      <button onClick={getPairing}>
        {loading ? "Loading..." : "Get Pairing"}
      </button>

      {results.map((r, i) => (
        <div key={i}>{r}</div>
      ))}
    </div>
  );
}
