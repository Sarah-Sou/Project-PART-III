const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  frequency: { type: String, enum: ["Daily", "Weekly", "Monthly"], required: true },
  status: { type: String, enum: ["Active", "Paused"], default: "Active" },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Habit", habitSchema);
