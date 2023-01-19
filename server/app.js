// npm i express body-parser cors dotenv mongoose mongoose-sequence

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("./v1/models/db");
const app = express();
const port = process.env.PORT || 8888;

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "x-accessToken,x-refreshToken");
  next();
});
app.use(express.static("uploads"));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Server 9999... ");
});
app.use("/api/v1/users", require("./v1/routes/user.route"));
app.use("/api/v1/post", require("./v1/routes/post.route"));
app.use("/api/v1/auth", require("./v1/routes/auth.route"));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
