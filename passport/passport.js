const User = require("../model/user");
const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "743404612451-3e014f9ilpv17350a9huiea94quk2c8k.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, next) => {
      User.findOne({ email: profile._json.email }).then((user) => {
        if (user) {
          console.log("User already exists", user);
          next(null, user);
        } else {
          User.create({
            name: profile.displayName,
            googleId: profile.id,
            email: profile._json.email,
          })
            .then((user) => {
              console.log("User saved", user);
              next(null, user);
            })
            .catch((err) => console.log(err));
        }
      });
      //   next();
    }
  )
);
