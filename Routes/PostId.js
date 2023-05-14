const router = require("express").Router();
const postModel = require("../models/posts");

router.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await postModel.findOne({ _id: id }).populate("author", "name");

  const date = post.createdAt.toString().split(" G")[0];

  res.json({
    authorName: post.author.name,
    authorId: post.author._id,
    postId: post._id,
    createdAt: date,
    title: post.title,
    summary: post.summary,
    content: post.content,
    cover: post.cover,
  });
});

module.exports = router;
