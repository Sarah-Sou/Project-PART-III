const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ oauthId: profile.id });

          if (!user) {
            user = await User.create({
              username: profile.displayName,
              oauthId: profile.id,
              provider: "google",
              profilePic: profile.photos?.[0]?.value || null
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
