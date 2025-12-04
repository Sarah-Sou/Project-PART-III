const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res) => {
  res.render("auth/login");
};

exports.getRegister = (req, res) => {
  res.render("auth/register");
};

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      req.flash("error", "Username already taken.");
      return res.redirect("/register");
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashed });
    await newUser.save();

    req.flash("success", "Account created!");
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    req.flash("error", "Error creating account");
    res.redirect("/register");
  }
};

exports.logoutUser = (req, res) => {
  req.logout(() => {
    req.flash("success", "Logged out");
    res.redirect("/");
  });
};
