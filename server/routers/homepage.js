const express = require("express");
const router = express.Router();

const categories = require("../database/categories.json");
const productController = require("../controllers/productControllers");
const sessionController = require("../controllers/sessionController");

router.route("/").get(async (req, res) => {
  const products = await productController.getAllProducts(req, res);
  const user = req.session.user;

  if (sessionController.hasSession(req)) {
    res.render("homepage", {
      categories: categories,
      displayBreadcrumb: false,
      products: products,
      user: user,
    });
  } else {
    res.redirect("/user/signin");
  }
});

async function renderHomepage(req, res) {
  if (sessionController.hasSession(req)) {
    res.redirect("/homepage/");
    return true;
  } else {
    return false;
  }
}

module.exports = {
  router,
  renderHomepage,
};
