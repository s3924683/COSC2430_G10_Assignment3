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

// Define a route for homepage
app.get("/", async (req, res) => {
  res.render("homepage", {
    categories: require("./server/database/categories.json"),
  });
});
app.get("/about", async (req, res) => {
  res.render("about", {
    categories: require("./server/database/categories.json"),
  });
});
// Define a route for category name
app.get("/categories/:categoryName", async (req, res) => {
  const categoryName = req.params.categoryName;
  const categories = require("./server/database/categories.json");
  res.render("productCategory", {
    categories: require("./server/database/categories.json"),
    activeCategory: categories[categoryName],
  });
});
// Define a route for user login
app.get("/user/:login?", function (req, res) {});
// Define a route for handling search queries
app.get("/search/:query/:sort?", function (req, res) {});
// Define a route for product display
app.get("/products/:product", function (req, res) {});
// Define a route for showing cart
app.get("/cart", function (req, res) {});

app.use(function (req, res, next) {
  res.status(404).send("<h1>Sorry, this page does not exist.</h1>");
});
