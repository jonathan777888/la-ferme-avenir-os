const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    module: "locations",
    status: "ready",
    data: []
  });
});

module.exports = router;
