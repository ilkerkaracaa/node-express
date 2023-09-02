// /hello/ route
import { Router } from "express";
import { hello } from "../lib/locale.js";
import { capitalize } from "../lib/string.js";
export const goodByRouter = Router();
// say hello in English
goodByRouter.get("/:name", (req, res, next) => {
  res.render("message", {
    title: `By by ${capitalize(req.params.name)}!`,
  });
});
