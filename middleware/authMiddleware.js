const User = require("../models/User");
module.exports = (req, res, next) => {
  User.findById(req.session.userId)
    .then((user) => {
      if (user) {
        next();
      } else {
        res.redirect("/");
      }
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/");
    });
};
