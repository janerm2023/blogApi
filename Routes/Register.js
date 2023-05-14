const router = require("express").Router();
const userModel = require("../models/Users");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // IF THERE IS NO NAME
    if (!name) {
      return res.json("name");
    }

    // IF THERE IS NO EMAIL
    if (!email) {
      return res.json("email");
    }

    // IF THERE IS NO PASSWORD
    if (!password) {
      return res.json("password");
    }

    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = await userModel.create({ name, email, password: hash });

    const user = await newUser.save();

    return res.json(user);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
