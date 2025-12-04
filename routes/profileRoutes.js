const express = require("express");
const router = express.Router();
const multer = require("multer");
const passport = require("passport"); // ⭐ FIX: Needed for req.isAuthenticated()
const User = require("../models/User");
const path = require("path");

/* ============================================================
   MULTER STORAGE
============================================================ */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, req.user.id + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/* ============================================================
   AUTH CHECK MIDDLEWARE
============================================================ */
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

/* ============================================================
   PROFILE PAGE
============================================================ */
router.get("/profile", isLoggedIn, (req, res) => {
  res.render("auth/profile", { user: req.user });  // ⭐ FIXED PATH
});

/* ============================================================
   UPLOAD PROFILE PICTURE
============================================================ */
router.post(
  "/profile/upload",
  isLoggedIn,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      // ⭐ FIX: Update correct field name
      req.user.profilePic = "/uploads/" + req.file.filename;
      await req.user.save();

      res.redirect("/profile");
    } catch (err) {
      console.log(err);
      res.send("Error uploading.");
    }
  }
);

module.exports = router;
