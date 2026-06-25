const express = require("express");
const cors = require("cors");
require("dotenv").config();

const scenesRoutes = require("./routes/scenes.routes");
const charactersRoutes = require("./routes/characters.routes");
const locationsRoutes = require("./routes/locations.routes");
const canonRulesRoutes = require("./routes/canonRules.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => {
  res.json({
    app: "La Ferme de l'Avenir OS",
    version: "0.3.0",
    status: "running",
    level: "6 - frontend/backend/AI linked"
  });
});

app.get("/health", (req, res) => {
  res.json({
    service: "backend",
    status: "ok"
  });
});

app.use("/api/scenes", scenesRoutes);
app.use("/api/characters", charactersRoutes);
app.use("/api/locations", locationsRoutes);
app.use("/api/canon-rules", canonRulesRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
