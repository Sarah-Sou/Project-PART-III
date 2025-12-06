//API Routes
const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit");

// Return all habits as JSON
router.get("/habits", async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: "Failed to load habits" });
  }
});

module.exports = router;
