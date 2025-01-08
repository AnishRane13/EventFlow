const express = require("express");
const { getAllEvents, createEvent, getEventByIdoftheOrganizer, getEventById } = require("./eventQueries");
const bcrypt = require("bcryptjs");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/organizer/:organizer_id", async (req, res) => {
  try {
    const { organizer_id } = req.params;
    const events = await getEventByIdoftheOrganizer(organizer_id);
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:event_id", async (req, res) => {
    try {
      const { event_id } = req.params;
      const event = await getEventById(event_id); // Assume this fetches event details from the DB
  
      if (event) {
        // Convert the binary image to a Base64 string
        event.banner_url = event.banner_url
          ? `data:image/png;base64,${event.banner_url.toString("base64")}`
          : null;
        res.status(200).json(event);
      } else {
        res.status(404).json({ error: "Event not found" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  


// Set up multer to handle file uploads
const storage = multer.memoryStorage(); // Store files in memory as buffer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only JPG, PNG, and JPEG are allowed."));
    }
    cb(null, true);
  },
});


// Create new event
router.post("/", upload.single("banner"), async (req, res) => {
    try {
      const { organizer_id, name, description, venue, date, time } = req.body;
      const bannerFile = req.file;
  
      // Validation
      if (
        !organizer_id ||
        !name ||
        !description ||
        !venue ||
        !date ||
        !time ||
        !bannerFile
      ) {
        return res.status(400).json({ error: "All fields are required, including banner image" });
      }
  
      // Validate date format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        return res.status(400).json({ error: "Invalid date format" });
      }
  
      // Save banner as a buffer to the database
      const bannerBuffer = bannerFile.buffer;
  
      const newEvent = await createEvent(
        organizer_id,
        name,
        description,
        venue,
        date,
        time,
        bannerBuffer // Save image as BYTEA in the database
      );
  
      res.status(201).json(newEvent);
    } catch (err) {
      console.error(err.message);
      if (err.code === "23505") {
        // Unique violation
        res.status(409).json({ error: "Event already exists" });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  });

module.exports = router;
