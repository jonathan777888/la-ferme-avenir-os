const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    module: "characters",
    status: "ready",
    data: []
  });
});

module.exports = router;
