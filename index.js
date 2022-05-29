const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
require("dotenv").config();
const passportConfig = require("./passport/passport");
const passport = require("passport");
const cookieSession = require("cookie-session");
const app = express();

mongoose.connect(process.env.DB_URL, () => {
  console.log("DB CONNECTED!!");
});

app.use(
  cookieSession({
    maxAge: 3 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  }
  next();
};

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.use("/auth", auth);
app.get("/", isLoggedIn, (req, res) => {
  res.render("home");
});

app.listen(4000, console.log("Server running at 4000..."));
