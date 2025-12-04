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

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash("error", "You must be logged in.");
  res.redirect("/login");
}

router.get("/", listHabits);

router.get("/create", showCreateForm);
router.post("/create", createHabit);

router.get("/:id", viewHabit);

router.get("/:id/edit", isLoggedIn, showEditForm);
router.post("/:id/edit", isLoggedIn, updateHabit);

router.post("/:id/delete", isLoggedIn, deleteHabit);

module.exports = router;
