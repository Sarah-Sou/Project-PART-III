const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");

/* ============================================================
   MULTER SETUP FOR PROFILE PICTURE UPLOAD
============================================================ */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, req.user.id + "_profile" + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

/* ============================================================
   REGISTER PAGE (GET)
============================================================ */
router.get("/register", (req, res) => {
  res.render("auth/register", { 
    message: req.flash("error"), 
    success: req.flash("success") 
  });
});

/* ============================================================
   REGISTER USER (POST)
============================================================ */
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      req.flash("error", "All fields are required.");
      return res.redirect("/register");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      req.flash("error", "Username already exists.");
      return res.redirect("/register");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
      provider: "local",
      profilePic: "/uploads/default.png" // default profile image
    });

    req.flash("success", "Account created! Please log in.");
    res.redirect("/login");

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    req.flash("error", "Something went wrong.");
    res.redirect("/register");
  }
});

/* ============================================================
   LOGIN PAGE (GET)
============================================================ */
router.get("/login", (req, res) => {
  res.render("auth/login", {
    message: req.flash("error"),
    success: req.flash("success")
  });
});

/* ============================================================
   LOGIN USER (POST)
============================================================ */
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect("/habits");
  }
);

/* ============================================================
   LOGOUT
============================================================ */
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

/* ============================================================
   GOOGLE AUTH
============================================================ */
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/habits");
  }
);

/* ============================================================
   DISCORD AUTH
============================================================ */
router.get("/auth/discord", passport.authenticate("discord"));

router.get(
  "/auth/discord/callback",
  passport.authenticate("discord", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/habits");
  }
);

/* ============================================================
   GITHUB AUTH
============================================================ */
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/habits");
  }
);

/* ============================================================
   PROFILE PAGE (GET)
============================================================ */
router.get("/profile", (req, res) => {
  if (!req.user) return res.redirect("/login");

  res.render("auth/profile", { 
    user: req.user   // IMPORTANT: send user to the EJS page
  });
});

/* ============================================================
   UPDATE PROFILE PICTURE (POST)
============================================================ */
router.post(
  "/update-profile-pic",
  upload.single("profilePic"),
  async (req, res) => {
    if (!req.user) return res.redirect("/login");

    if (!req.file) {
      req.flash("error", "No image selected.");
      return res.redirect("/profile");
    }

    req.user.profilePic = "/uploads/" + req.file.filename;
    await req.user.save();

    req.flash("success", "Profile picture updated!");
    res.redirect("/profile");
  }
);
/* ============================================================
   PASSWORD CHANGE PAGE (GET)
============================================================ */
router.get("/change-password", (req, res) => {
  if (!req.user) return res.redirect("/login");

  res.render("auth/change-password", {
    error: req.flash("error"),
    success: req.flash("success"),
  });
});

/* ============================================================
   PASSWORD CHANGE (POST)
============================================================ */
router.post("/change-password", async (req, res) => {
  if (!req.user) return res.redirect("/login");

  const { currentPassword, newPassword } = req.body;

  try {
    // Check if fields exist
    if (!currentPassword || !newPassword) {
      req.flash("error", "All fields are required.");
      return res.redirect("/change-password");
    }

    // Validate current password
    const isMatch = await bcrypt.compare(currentPassword, req.user.password);
    if (!isMatch) {
      req.flash("error", "Current password is incorrect.");
      return res.redirect("/change-password");
    }

    // Prevent same password reuse
    const isSame = await bcrypt.compare(newPassword, req.user.password);
    if (isSame) {
      req.flash("error", "New password cannot be the same as current password.");
      return res.redirect("/change-password");
    }

    // Hash new password
    const hashed = await bcrypt.hash(newPassword, 10);

    // Save the new one
    req.user.password = hashed;
    await req.user.save();

    req.flash("success", "Password updated successfully!");
    res.redirect("/change-password");

  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong.");
    res.redirect("/change-password");
  }
});

module.exports = router;
