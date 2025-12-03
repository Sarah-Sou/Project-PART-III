const express = require("express");
const router = express.Router();
const {
  listHabits,
  showCreateForm,
  createHabit,
  viewHabit,
  showEditForm,
  updateHabit,
  deleteHabit
} = require("../controllers/habitController");

// Middleware — require login for update + delete
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash("error", "You must be logged in to do that.");
  res.redirect("/login");
}

// List habits (Public)
router.get("/", listHabits);

// Create Habit
router.get("/create", showCreateForm);
router.post("/create", createHabit);

// View Habit
router.get("/:id", viewHabit);

// Edit Habit — PROTECTED
router.get("/:id/edit", isLoggedIn, showEditForm);
router.post("/:id/edit", isLoggedIn, updateHabit);

// Delete Habit — PROTECTED
router.post("/:id/delete", isLoggedIn, deleteHabit);

module.exports = router;
