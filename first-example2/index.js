// Express application
import express from "express";
import compression from "compression";
import { fileURLToPath } from "url";
import { dirname, sep } from "path";
// configuration
const __dirname = dirname(fileURLToPath(import.meta.url)) + sep,
  cfg = {
    port: process.env.PORT || 3000,
    dir: {
      root: __dirname,
      static: __dirname + "static" + sep,
      views: __dirname + "views" + sep,
    },
  };
console.dir(cfg, { depth: null, color: true });
// Express initiation// ...rest of code
const app = express();
// home page route

// use EJS templates
app.set("view engine", "ejs");
app.set("views", cfg.dir.views);

app.disabled("x-powered-by");

// HTTP compression
app.use(compression());

//url printed to consolo.log
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// home page route
app.get("/", (req, res) => {
  res.render("message", { title: "Hello World!" });
});

// // another route
// app.get("/hello/", (req, res) => {
//   res.render("message", { title: "Hello again!" });
// });

// /hello/ route
import { helloRouter } from "./routes/hello.js";
app.use("/hello", helloRouter);

// /goodBy/ route
import { goodByRouter } from "./routes/goodBy.js";
app.use("/goodby", goodByRouter);

app.use(express.static(cfg.dir.static));

// 404 errors
app.use((req, res) => {
  res.status(404).render("message", { title: "Not found" });
});

// start server
app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${cfg.port}`);
});

// export defaults
export { cfg, app };

// start HTTPS server
// import { createServer } from "https";
// import { readFileSync } from "fs";
// createServer(
//   {
//     key: fs.readFileSync("./server.key"),
//     cert: fs.readFileSync("./server.crt"),
//   },
//   app
// ).listen(cfg.port);
