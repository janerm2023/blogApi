require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const Register = require("./Routes/Register");
const Login = require("./Routes/Login");
const Logout = require("./Routes/Logout");
const CreatePost = require("./Routes/CreatePost");
const Posts = require("./Routes/Posts");
const PostId = require("./Routes/PostId");
const UpdateId = require("./Routes/Update");

const app = express();

mongoose.connect(process.env.MONGO_URI);

app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

// ROUTES
app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
    if (err) {
      res.json("noToken");
    }
    res.json({
      name: user.name.split(" ")[0],
      email: user.email,
      id: user.id,
      iat: user.iat,
    });
  });
});

app.use("/api", Register);
app.use("/api", Login);
app.use("/api", Logout);
app.use("/api", CreatePost);
app.use("/api", Posts);
app.use("/api", PostId);
app.use("/api", UpdateId);

app.listen(5000, () => {
  console.log("Server listening on Port 5000");
});
