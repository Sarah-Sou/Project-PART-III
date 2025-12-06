const express = require("express");
const router = express.Router();
const passport = require("passport");

// Google Login Route
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// Google Callback Route
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/profile"   // redirect after login
  })
);

module.exports = router;
