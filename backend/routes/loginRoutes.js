const express = require("express");
const Contact = require("../models/Login");
const router = express.Router();

// 📌 Contact Form Submission
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const newLogin = new Contact({  email, password });
    await newMessage.save();
    res.status(201).json({ message: "Loggedin successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
