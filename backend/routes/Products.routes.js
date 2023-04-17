const express = require("express");
const Products = require("../controllers/Products");
const productsRouter = express.Router();

productsRouter.get("/products", Products.getAllProducts);
productsRouter.get("/products/category/:categoryName", Products.getSpecialCategoryProducts);
productsRouter.get("/products/:productId", Products.getProduct)
productsRouter.post("/products", Products.createProduct);
productsRouter.patch("/products/:productId", Products.updateProduct);
productsRouter.delete("/products/:productId", Products.deleteProduct);

module.exports = productsRouter;

