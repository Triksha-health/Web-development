const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/User"); 

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value.toLowerCase();

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            password: null, //when user is using google auth to signup
            role: "user",
            isVerified: true,
            googleId: profile.id, //  if schema has googleId
            avatar: profile.photos?.[0]?.value, //  profile image
          });
        }

        return done(null, user);
      } catch (err) {
         console.error("❌ Google OAuth error:", err);
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user))
   .catch(err => done(err, null));
});
