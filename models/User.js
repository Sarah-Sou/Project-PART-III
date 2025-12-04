const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  oauthId: String,
  provider: String,

  // ⭐ NEW FIELD (Bonus)
  profilePic: {
    type: String,
    default: "/uploads/default.png",
  }
});

module.exports = mongoose.model("User", userSchema);
