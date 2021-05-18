import express from "express";
const router = express.Router();

const inboundSMS = (request: any, response: any) => {
  const params = Object.assign(request.query, request.body);
  console.log(params);
  response.status(204).send();
};

router.post("/", inboundSMS);
router.get("/", inboundSMS);

module.exports = router;
