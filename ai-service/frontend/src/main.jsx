import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">Niveau 5</p>
        <h1>La Ferme de l'Avenir OS</h1>
        <p>
          Interface React du studio IA : bible creative, scenes, gardien du canon
          et generation de prompts.
        </p>
      </section>

      <section className="grid">
        <div className="card">
          <h2>Bible creative</h2>
          <p>Personnages, lieux et regles du canon.</p>
        </div>

        <div className="card">
          <h2>Scenes</h2>
          <p>Creation et organisation des scenes du manga ou de l'animation.</p>
        </div>

        <div className="card">
          <h2>Gardien du canon</h2>
          <p>Verification de coherence narrative et artistique.</p>
        </div>

        <div className="card">
          <h2>Prompts</h2>
          <p>Generation de prompts manga, image et animation.</p>
        </div>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
