const BlogPost = require("../models/BlogPost.js");
module.exports = async (req, res) => {
  const blogposts = await BlogPost.find({}).populate("userid");
  console.log(req.session);
  console.log(loggedIn);
  res.render("index", {
    blogposts,
  });
};
