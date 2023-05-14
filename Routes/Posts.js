const router = require("express").Router();
const postModel = require("../models/posts");

router.get("/posts", async (req, res) => {
  try {
    res.json(
      await postModel
        .find()
        .populate("author", "name")
        .sort({ createdAt: -1 })
        .limit(15)
    );
  } catch (error) {
    throw error;
  }
});

module.exports = router;
