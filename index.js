const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const passportConfig = require("./passport/passport");
const passport = require("passport");
const cookieSession = require("cookie-session");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/passport", () => {
  console.log("DB CONNECTED!!");
});

app.use(
  cookieSession({
    maxAge: 3 * 24 * 60 * 60 * 1000,
    keys: ["thisismytokenkey"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.use("/auth", auth);
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(4000, console.log("Server running at 4000..."));
