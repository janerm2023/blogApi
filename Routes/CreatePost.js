const router = require("express").Router();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
// For renaming the uploaded file
const fs = require("fs");
const PostModel = require("../models/posts");
const jwt = require("jsonwebtoken");

//   uploadMiddleware.single("files") ===> The 'files' String must be equal to the name in data.set() in the client side
router.post(
  "/create-post",
  uploadMiddleware.single("files"),
  async (req, res) => {
    try {
      const { originalname, path } = req.file;

      const ext = originalname.split(".")[1];
      const newPath = path + "." + ext;

      // Rename path using built-in module
      fs.renameSync(path, newPath);

      const { token } = req.cookies;
      jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) throw err;

        const { title, summary, content } = req.body;

        // Create new Post
        const newPost = await PostModel.create({
          title,
          summary,
          content,
          cover: newPath,
          author: user.id,
        });

        return res.json(newPost);
      });
    } catch (error) {
      throw error;
    }
  }
);

module.exports = router;
