const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ githubId: profile.id });

          if (!user) {
            user = await User.create({
              username: profile.username,
              githubId: profile.id,
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
};
