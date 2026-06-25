const express = require("express");
const axios = require("axios");

const router = express.Router();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:5001";

router.get("/health", async (req, res) => {
  try {
    const response = await axios.get(`${AI_SERVICE_URL}/health`);
    res.json({
      backend: "ok",
      ai: response.data
    });
  } catch (error) {
    res.status(503).json({
      backend: "ok",
      ai: "unreachable",
      message: error.message
    });
  }
});

router.post("/check-canon", async (req, res) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/check-canon`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(503).json({
      error: "AI service unavailable",
      message: error.message
    });
  }
});

router.post("/generate-prompt", async (req, res) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/generate-prompt`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(503).json({
      error: "AI service unavailable",
      message: error.message
    });
  }
});

module.exports = router;
