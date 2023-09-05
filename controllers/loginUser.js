const bcrypt = require("bcrypt");
const User = require("../models/User");
module.exports = (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (username === "" && password === "") {
    error("all fields are required");
  }
  if (username === "") {
    error("username is required");
  }
  if (password === "") {
    error("password is required");
  }
  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (error, same) => {
          if (same) {
            // store user session
            loggedIn = true;
            req.session.userId = user._id;
            res.redirect("/");
          } else {
            const error = new Array("password is incorrect");
            req.flash("error", error);
            req.flash("data", req.body);
            res.redirect("/auth/login");
          }
        });
      }
    })
    .catch((error) => {
      error("username is incorrect");
    });
  function error(arr) {
    const error = new Array(arr);
    req.flash("error", error);
    req.flash("data", req.body);
    res.redirect("/auth/login");
  }
};
