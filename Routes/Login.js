const router = require("express").Router();
const userModel = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //   IF THERE IS NO EMAIL
    if (!email) {
      return res.json("email");
    }

    //   IF THERE IS NO PASSWORD
    if (!password) {
      return res.json("password");
    }

    const user = await userModel.findOne({ email });

    const hash = await bcrypt.compare(password, user.password);

    if (hash) {
      jwt.sign(
        { name: user.name, email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;

          res.cookie("token", token).json("ok");
        }
      );
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
