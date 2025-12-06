const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const dotenv = require("dotenv");
dotenv.config();

// ⬅️ ADD CORS HERE
const cors = require("cors");
app.use(cors());

// Models
const User = require("./models/User");

// Routes
const habitRoutes = require("./routes/habitRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes"); // ⭐ REQUIRED

// GOOGLE ROUTES + STRATEGY
const googleRoutes = require("./routes/googleRoutes");
require("./controllers/googleStrategy")(passport);

// OAUTH STRATEGIES
const GitHubStrategy = require("passport-github2").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;


// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


/* ===============================================
     LOCAL STRATEGY
================================================ */
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: "Incorrect username" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);


/* ===============================================
     DISCORD STRATEGY
================================================ */
passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ oauthId: profile.id });

        if (!user) {
          user = await User.create({
            username: profile.username,
            oauthId: profile.id,
            provider: "discord",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);


/* ===============================================
     GITHUB STRATEGY
================================================ */
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ oauthId: profile.id });

        if (!user) {
          user = await User.create({
            username: profile.username || profile.displayName,
            oauthId: profile.id,
            provider: "github",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);


/* ===============================================
     SERIALIZE + DESERIALIZE
================================================ */
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});


/* ===============================================
     DATABASE
================================================ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));


/* ===============================================
     GLOBAL EJS VARIABLES
================================================ */
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});


/* ===============================================
     ROUTES
================================================ */
app.use("/", authRoutes);
app.use("/", profileRoutes);  // ⭐ FIX — MUST BE HERE
app.use("/habits", habitRoutes);
app.use(googleRoutes);


/* ===============================================
     HOME
================================================ */
app.get("/", (req, res) => {
  res.render("index", { habits: [] });
});


/* ===============================================
     START SERVER
================================================ */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
