const Habit = require("../models/Habit");

// List habits
exports.listHabits = async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 });
    res.render("index", { habits });
  } catch (err) {
    res.send("Error loading habits");
  }
};

// Show Create
exports.showCreateForm = (req, res) => {
  res.render("habits/create");
};

// Create
exports.createHabit = async (req, res) => {
  const { title, description, frequency, status } = req.body;

  try {
    const habit = new Habit({
      title,
      description,
      frequency,
      status,
      user: req.user ? req.user._id : null,
    });

    await habit.save();
    res.redirect("/habits");
  } catch (err) {
    res.send("Error creating habit");
  }
};

// View
exports.viewHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    res.render("habits/view", { habit });
  } catch {
    res.send("Habit not found");
  }
};

// Show Edit
exports.showEditForm = async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  res.render("habits/edit", { habit });
};

// Update
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
  } catch {
    res.send("Error updating habit");
  }
};

// Delete
exports.deleteHabit = async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.redirect("/habits");
  } catch {
    res.send("Error deleting habit");
  }
};
