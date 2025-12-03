const Habit = require("../models/Habit");

// List All Habits (Public)
exports.listHabits = async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 });
    res.render("index", { habits });
  } catch (err) {
    console.log(err);
    res.send("Error loading habits");
  }
};

// Show Create Form
exports.showCreateForm = (req, res) => {
  res.render("habits/create");
};

// Create Habit
exports.createHabit = async (req, res) => {
  const { title, description, frequency, status } = req.body;

  try {
    const habit = new Habit({
      title,
      description,
      frequency,
      status,
      user: req.user ? req.user._id : null, // associate if logged in
    });

    await habit.save();
    res.redirect("/habits");
  } catch (err) {
    console.log(err);
    res.send("Error creating habit");
  }
};

// View Habit Details
exports.viewHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    res.render("habits/view", { habit });
  } catch (err) {
    console.log(err);
    res.send("Habit not found");
  }
};

// Show Edit Form (ONLY if logged in)
exports.showEditForm = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    res.render("habits/edit", { habit });
  } catch (err) {
    console.log(err);
    res.send("Error loading edit page");
  }
};

// Update Habit
exports.updateHabit = async (req, res) => {
  const { title, description, frequency, status } = req.body;

  try {
    await Habit.findByIdAndUpdate(req.params.id, {
      title,
      description,
      frequency,
      status,
    });

    res.redirect(`/habits/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.send("Error updating habit");
  }
};

// Delete Habit
exports.deleteHabit = async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.redirect("/habits");
  } catch (err) {
    console.log(err);
    res.send("Error deleting habit");
  }
};
