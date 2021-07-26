import express from "express";
const router = express.Router();

router.get("/", (_, res) => {
  res.render("AfterClick");
});

export default router;
