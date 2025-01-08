const express = require("express");
const { getAllUsers, createUser } = require("./userQueries");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create new user
router.post("/", async (req, res) => {
  try {
    const { name, email, password, phone_number, role } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ error: "Name, email, password, and role are required" });
    }

    // Validate role
    if (!["organizer", "attendee"].includes(role)) {
      return res
        .status(400)
        .json({ error: "Role must be either 'organizer' or 'attendee'" });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Phone number validation (optional field)
    if (phone_number) {
      const phoneRegex = /^\+?[\d\s-]{8,}$/;
      if (!phoneRegex.test(phone_number)) {
        return res.status(400).json({ error: "Invalid phone number format" });
      }
    }

    const newUser = await createUser(name, email, password, phone_number, role);

    // Remove password from response
    delete newUser.password_hash;

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err.message);
    if (err.code === "23505") {
      // Unique violation
      res.status(409).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

module.exports = router;
