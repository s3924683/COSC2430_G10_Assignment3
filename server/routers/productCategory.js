const express = require('express');
const router = express.Router();

router.route('/:categoryName').get((req, res) => {
    const categoryName = req.params.categoryName;
    const categories = require("../database/categories.json");

    res.render('productCategory', {
        categories: categories,
        activeCategory: categories[categoryName],
    });
})

module.exports = router