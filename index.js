const express = require("express");


const addProductRouter = require('./server/routers/addProduct')
const productCategoryRouter = require('./server/routers/productCategory')
const homepageRouter = require("./server/routers/homepage")
const searchRouter = require('./server/routers/search')
const productDetailRouter = require('./server/routers/productDetail')
const aboutRouter = require('./server/routers/about')

const path = require("path");
require("dotenv").config();
require("./server/database/mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", homepageRouter)
app.use("/about", aboutRouter)
app.use("/addProduct", addProductRouter)
app.use("/category", productCategoryRouter)
app.use("/search", searchRouter)
app.use('/product', productDetailRouter)

app.use((req, res, next) => {
  res.status(404).send("<h1>Sorry, this page does not exist.</h1>");
});

app.listen(3000, () => {
  console.log("App listening to port 3000");
});