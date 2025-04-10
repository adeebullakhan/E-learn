const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

// 📌 Contact Form Submission
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
