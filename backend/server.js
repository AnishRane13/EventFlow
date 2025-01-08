const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Impo
const userRoutes = require("./routes/User/userRoutes");
const eventRoutes = require("./routes/Events/eventRoutes");

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// User Routes
app.use("/api/users", userRoutes);

// Event Routes
app.use("/api/events", eventRoutes);
app.use("/api/events/organizer/:organizer_id", eventRoutes);
app.use("/api/events/:event_id", eventRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
