const express = require("express");
//const path = require("path");
const app = new express();
const ejs = require("ejs");
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
//const BlogPost = require("./models/BlogPost");
const fileUpload = require("express-fileupload");
app.use(fileUpload());
const expressSession = require("express-session");
var flash = require("connect-flash");

app.use(flash());

mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

app.use(express.static("public"));
app.listen(4000, () => {
  console.log("App listening on port 4000");
});

app.use(
  expressSession({
    secret: "keyboard cat", // Güvenlik nedeniyle gerçek gizli anahtarınızla değiştirin
    resave: false, // Uyarıyı önlemek için false olarak ayarlayın
    saveUninitialized: true, // İhtiyaca bağlı olarak true veya false olarak ayarlayın
  })
);

const authMiddleware = require("./middleware/authMiddleware");

const validateMiddleware = require("./middleware/validationMiddleware.js");

const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
//validationMiddleware.js
// const validateMiddleWare = (req, res, next) => {
//   console.log(req);
//   if (req.files == null || req.body.title == null || req.body.body == null) {
//     return res.redirect("/posts/new");
//   }
//   next();
// };
app.use("/posts/store", validateMiddleware);

// app.get("/", (req, res) => {
//   res.render("index");
// });

const homeController = require("./controllers/home");
app.get("/", homeController);
//home.js
// app.get("/", async (req, res) => {
//   const blogposts = await BlogPost.find({});
//   res.render("index", {
//     blogposts,
//   });
// });

//Deleted
// app.get("/about", (req, res) => {
//   res.render("about");
// });

//Deleted
// app.get("/contact", (req, res) => {
//   res.render("contact");
// });

const getPostController = require("./controllers/getPost");
app.get("/post/:id", getPostController);
//getpost.js
// app.get("/post/:id", async (req, res) => {
//   const blogpost = await BlogPost.findById(req.params.id);
//   res.render("post", {
//     blogpost,
//   });
// });

const newPostController = require("./controllers/newPost");
app.get("/posts/new", authMiddleware, newPostController);

// app.post("/posts/store", (req, res) => {
//   BlogPost.create(req.body)
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

const storePostController = require("./controllers/storePost");
app.post("/posts/store", authMiddleware, storePostController);
//storePost.js
// app.post("/posts/store", async (req, res) => {
//   let image = req.files.image;
//   image.mv(
//     path.resolve(__dirname, "public/assets/img", image.name),
//     async (error) => {
//       await BlogPost.create({
//         ...req.body,
//         image: "/assets/img/" + image.name,
//       });
//       res.redirect("/");
//     }
//   );
// });

const newUserController = require("./controllers/newUser");
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);

const storeUserController = require("./controllers/storeUser");
app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);

const loginController = require("./controllers/login");
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);

const loginUserController = require("./controllers/loginUser");
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);

global.loggedIn = false;

const logoutController = require("./controllers/logout");
app.get("/auth/logout", logoutController);

app.use((req, res) => res.render("notfound"));
