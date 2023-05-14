const router = require("express").Router();

router.post("/logout", async (req, res) => {
  res.cookie("token", "").json("ok");
});

module.exports = router;
