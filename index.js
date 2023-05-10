const express = require("express");
const path = require("path");
require("dotenv").config();
require("./server/database/mongoose");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("App listening to port 3000");
});

app.get("/", async (req, res) => {
  res.render("homepage");
});
