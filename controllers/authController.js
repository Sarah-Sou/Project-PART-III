
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET Login Page
exports.getLogin = (req, res) => {
  res.render("auth/login");
};

// GET Register Page
exports.getRegister = (req, res) => {
  res.render("auth/register");
};

// POST Register User
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      req.flash("error", "Username already taken.");
      return res.redirect("/register");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    req.flash("success", "Account created! You can now login.");
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong.");
    res.redirect("/register");
  }
};

// GET Logout
exports.logoutUser = (req, res) => {
  req.logout(function () {
    req.flash("success", "Logged out successfully.");
    res.redirect("/");
  });
};
