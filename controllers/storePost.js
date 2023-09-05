const BlogPost = require("../models/BlogPost.js");
const path = require("path");
module.exports = (req, res) => {
  let image = req.files.image;
  image.mv(
    path.resolve(__dirname, "..", "public/assets/img", image.name),
    async (error) => {
      await BlogPost.create({
        ...req.body,
        image: "/assets/img/" + image.name,
      });
      res.redirect("/");
    }
  );
};

// module.exports = (req, res) => {
//   async (error) => {
//     await BlogPost.create({
//       ...req.body,
//     });
//     res.redirect("/");
//   };
// };
