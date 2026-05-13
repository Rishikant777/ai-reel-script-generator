import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    topic: "",
    niche: "",
    platform: "",
    style: "",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateScript = async () => {
    setLoading(true);
    setResult("");

    const res = await fetch("http://localhost:5000/api/ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setResult(data.content);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI Reel Script Generator</h1>
      <p>Create viral reel scripts using AI</p>

      <input name="topic" placeholder="Topic" onChange={handleChange} />
      <input name="niche" placeholder="Niche" onChange={handleChange} />
      <input name="platform" placeholder="Platform" onChange={handleChange} />
      <input name="style" placeholder="Style" onChange={handleChange} />

      <button onClick={generateScript}>
        {loading ? "Generating..." : "Generate Script"}
      </button>

      {result && (
        <div className="result">
          <h2>Generated Script</h2>
          <button onClick={() => navigator.clipboard.writeText(result)}>
            Copy Script
          </button>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default App;