const express = require("express");
const Login = require("../models/Login");
const router = express.Router();

// 📌 login Form Submission
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const newLogin = new Login({  email, password });
    await newLogin.save();
    res.status(201).json({ message: "Loggedin successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
