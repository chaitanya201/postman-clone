const router = require("express").Router();

router.get("/get", (req, res) => {
  return res.json({ status: true, msg: "Get is working." });
});

module.exports = router;
