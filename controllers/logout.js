module.exports = (req, res) => {
  req.session.destroy(() => {
    loggedIn = false;
    res.redirect("/");
  });
};
