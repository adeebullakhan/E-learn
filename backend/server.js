// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contactRoutes');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors()); 

app.use(express.json());
app.use('/api',contactRoutes); // Contact form route
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB ✅');
    app.listen(6050, () => console.log('Server running on port 6050 🚀'));
  })
  .catch(err => {
    console.error('MongoDB connection error ❌:', err);
  });
