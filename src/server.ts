//External variables/modules imports
import { APIURLS } from "./core/ImportantVariables/ENDPOINT_NAMES";
import express from "express";
import router from "./routes/router";
require("dotenv").config();
const cors = require("cors");

//Initialize variables
const app = express();
const PORT = process.env.PORT || 5000;

//Config
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/views"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use("/", router);

//Server Listening
app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
