const router = require("express").Router();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const postModel = require("../models/posts");
const fs = require("fs");
const jwt = require("jsonwebtoken");

router.put(
  "/post/updatePost",
  uploadMiddleware.single("files"),
  async (req, res) => {
    try {
      // let newPath = null;
      if (req.file) {
        const { originalname, path } = req.file;

        const ext = originalname.split(".")[1];
        const newPath = path + "." + ext;

        // Rename path using built-in module
        fs.renameSync(path, newPath);

        const { token } = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
          if (err) throw err;

          const { id } = req.body;

          const postDoc = await postModel.findOne({ _id: id });

          const toBeUpdate = {
            title: postDoc.title,
            summary: postDoc.summary,
            content: postDoc.content,
            cover: newPath ? newPath : postDoc.cover,
            author: user.id,
          };

          const updatedDoc = await postModel.updateOne(postDoc, toBeUpdate);

          res.json(updatedDoc);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
