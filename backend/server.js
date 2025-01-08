const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/User/userRoutes");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// User Routes
app.use("/api/users", userRoutes);
// app.use("/api/users", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
