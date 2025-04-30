const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post('http://localhost:5000/chat', { message });
    res.json({ reply: response.data.reply });
  } catch (error) {
    res.status(500).json({ reply: 'AI service failed', error: error.message });
  }
});

module.exports = router;
