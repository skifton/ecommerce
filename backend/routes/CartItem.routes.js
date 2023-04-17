const express = require("express");
const CartItem = require("../controllers/CartItem");
const cartItemRouter = express.Router();

cartItemRouter.get("/cart-item/:session_id", CartItem.getCartItems);
cartItemRouter.post("/cart-item", CartItem.createCartItem)
cartItemRouter.put("/cart-item/:cartItemId", CartItem.updateCartItem);
cartItemRouter.delete("/cart-item/:cartItemId", CartItem.deleteCartItem);

module.exports = cartItemRouter;
