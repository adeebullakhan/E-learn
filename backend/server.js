const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const contactRoutes = require("./routes/contactRoutes");
const contactRoutes = require("./routes/loginRoutes");
const login = require("./models/login");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 6050;

app.use(cors());
app.use(express.json());

connectDB(); // Connect to MongoDB

app.use("/api", contactRoutes);
app.use("/api", loginRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
