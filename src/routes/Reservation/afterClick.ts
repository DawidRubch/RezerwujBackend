import express from "express";
const afterClickRouter = express.Router();

afterClickRouter.get("/", (_, res) => {
  res.render("AfterClick");
});

export { afterClickRouter };
