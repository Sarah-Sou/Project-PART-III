const express = require("express");
const passport = require("passport");
const router = express.Router();

// Login with Google
router.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

// Callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login"
  }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
