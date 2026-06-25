import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

function App() {
  const [content, setContent] = useState("");
  const [report, setReport] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");

  async function checkCanon() {
    setError("");
    setReport(null);

    try {
      const response = await fetch("/api/ai/check-canon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          scene: {
            title: "Scene test",
            content,
            location_name: "Ferme centrale prototype",
            tone: "calme et strategique",
            characters: [
              {
                name: "Mira prototype",
                personality: "calme, strategique, protectrice"
              }
            ]
          },
          canonData: {
            canon_rules: [],
            characters: [],
            locations: []
          }
        })
      });

      const data = await response.json();
      setReport(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function generatePrompt() {
    setError("");
    setPrompt("");

    try {
      const response = await fetch("/api/ai/generate-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt_type: "manga",
          scene: {
            title: "Scene test",
            content,
            location_name: "Ferme centrale prototype",
            tone: "calme et strategique",
            characters: [
              {
                name: "Mira prototype"
              }
            ]
          }
        })
      });

      const data = await response.json();
      setPrompt(data.prompt_text);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">Niveau 6</p>
        <h1>La Ferme de l'Avenir OS</h1>
        <p>React appelle Express. Express appelle Flask. Le gardien du canon est connecte.</p>
      </section>

      <section className="card">
        <h2>Scene a verifier</h2>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Ecris une scene ici..."
        />

        <div className="actions">
          <button onClick={checkCanon}>Verifier le canon</button>
          <button onClick={generatePrompt}>Generer un prompt manga</button>
        </div>
      </section>

      {error && (
        <section className="error">
          {error}
        </section>
      )}

      {report && (
        <section className="card">
          <h2>Rapport canon</h2>
          <pre>{JSON.stringify(report, null, 2)}</pre>
        </section>
      )}

      {prompt && (
        <section className="card">
          <h2>Prompt genere</h2>
          <pre>{prompt}</pre>
        </section>
      )}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
