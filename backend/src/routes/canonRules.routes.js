const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    module: "canon-rules",
    status: "ready",
    data: []
  });
});

module.exports = router;
