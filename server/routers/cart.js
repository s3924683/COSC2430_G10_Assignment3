const express = require("express");
const router = express.Router();

router.route("/").get(async (req, res) => {
  res.render("cart")
}).post(async(req,res)=>{
    const products = req.params
    products.price
    let total = 0
    for(let i = 0 ; i < products.length; i++){
        total + products[i]
    }

    total
    res.render("buy",{
        total: total
    })
});

module.exports = router;
