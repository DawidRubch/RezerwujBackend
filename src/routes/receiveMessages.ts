const express = require("express");
const router = express.Router();

router.post("/", (request: any, response: any) => {
  const params = Object.assign(request.query, request.body);
  console.log(params);
  response.status(204).send();
});
module.exports = router;
