const User = require("../models/User.js");
const path = require("path");
module.exports = (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/auth/register");
    });
};
