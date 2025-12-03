const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getLogin, getRegister, registerUser, logoutUser } = require("../controllers/authController");

// Login Page
router.get("/login", getLogin);

// Register Page
router.get("/register", getRegister);

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect("/");
  }
);

// Logout
router.get("/logout", logoutUser);

module.exports = router;
