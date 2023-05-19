const express = require("express");
const path = require("path");
require("dotenv").config();

const addProductRouter = require('./server/routers/addProduct')
const productCategoryRouter = require('./server/routers/productCategory')
const homepageRouter = require("./server/routers/homepage")
const searchRouter = require('./server/routers/search')
const productDetailRouter = require('./server/routers/productDetail')
const aboutRouter = require('./server/routers/about')
const userRouter = require("./server/routers/user")
const vendorRouter = require("./server/routers/vendor")
const shipperRouter = require("./server/routers/shipper")
const cartRouter = require("./server/routers/cart")
const paymentpageRouter = require("./server/routers/paymentpage")
const thankyouRouter = require("./server/routers/thankyou")

require("./server/database/mongoose");

const PORT = 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRouter)
app.use("/vendor", vendorRouter)
app.use("/shipper", shipperRouter)

app.use("/", homepageRouter)
app.use("/about", aboutRouter)
app.use("/addProduct", addProductRouter)
app.use("/category", productCategoryRouter)
app.use("/search", searchRouter)
app.use('/product', productDetailRouter)
app.use('/cart',cartRouter)
app.use('/payment',paymentpageRouter)
app.use('/thankyou',thankyouRouter)

app.use((req, res, next) => {
  res.status(404).send("<h1>Sorry, this page does not exist.</h1>");
});

app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
});