const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getLogin, getRegister, registerUser, logoutUser } = require("../controllers/authController");

router.get("/login", getLogin);
router.get("/register", getRegister);
router.post("/register", registerUser);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => res.redirect("/")
);

router.get("/logout", logoutUser);

module.exports = router;
