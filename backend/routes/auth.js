// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const session = require('express-session');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
// router.use(session({
//   secret: process.env.JWT_SECRET,
//   resave: false,
//   saveUninitialized: true
// }));

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     res.redirect("http://localhost:3000/dashboard"); // Ensure this URL is correct
//   }
// );

// router.use(passport.initialize());
// router.use(passport.session());

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://localhost:5000/api/auth/google/callback"
// }, (accessToken, refreshToken, profile, done) => {
//   return done(null, profile);
// }));

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// // Google OAuth Route
// router.get('/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     res.redirect('/dashboard');
//   }
// );

// router.get("/logout", (req, res) => {
//   req.logout(() => {
//     res.redirect("/");
//   });
// });


// module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Google OAuth Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    if (req.user) {
      res.redirect('/dashboard'); // Redirect on success
    } else {
      console.error("Authentication failed");
      res.redirect('/'); // Redirect to login if failed
    }
  }
);


router.use(session({
  secret: process.env.JWT_SECRET, // Or your session secret
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport
router.use(passport.initialize());
router.use(passport.session());

// Google OAuth Strategy Configuration
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile); // You can save the profile to the database here
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Logout Route
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/"); // Redirect to home or login page after logout
  });
});

module.exports = router;
