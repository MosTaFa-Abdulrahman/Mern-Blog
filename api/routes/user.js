const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

// Update
router.put("/update/:id", async (req, res, next) => {
  if (req.params.id === req.body.userId) {
    try {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
      }
    } catch (error) {
      res.status(400).json(error.message);
    }

    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else res.status(403).json("You Can Update Only Your Account ~!");
});

// Delete
router.delete("/delete/:id", async (req, res, next) => {
  if (req.params.id === req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete User Successful ☻♥");
      } catch (error) {
        res.status(500).json(error.message);
      }
    } catch (error) {
      res.status(403).json("User not found ~!");
    }
  } else res.status(500).json("You Can Delete Only Your Account ~~!");
});

// Get
router.get("/get/:id", async (req, res, next) => {
  if (req.params.id === req.body.userId) {
    try {
      const getUser = await User.findById(req.params.id);
      const { password, ...others } = getUser._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else res.status(500).json("You Can GET Only Your Account ~~!");
});

module.exports = router;
