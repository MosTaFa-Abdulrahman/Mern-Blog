const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashPassword });

    const userSaved = await newUser.save();
    res.status(200).json(userSaved);
  } catch (error) {
    res.status(404).json(error);
  }
});

// Login
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(500).json("User not found ~!");

    const validatePassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    !validatePassword && res.status(500).json("Password Wrong ~!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
