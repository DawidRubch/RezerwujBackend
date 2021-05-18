import express from "express";

const router = express.Router();

//Route for handling reply sent from RoP owner
router.get("/", (request: any, response: any) => {
  const params = Object.assign(request.query, request.body);
  //RoP owner decision
  const choice = params["text"];

  
});
