const express = require("express");
const ShoppingSession = require("../controllers/ShoppingSession");
const shoppingSessionRouter = express.Router();

shoppingSessionRouter.get("/shopping-session/:user_id", ShoppingSession.getSession);
shoppingSessionRouter.post("/shopping-session/:user_id", ShoppingSession.createShoppingSession)
shoppingSessionRouter.put("/shopping-session/:user_id", ShoppingSession.updateSession);
shoppingSessionRouter.delete("/shopping-session/:user_id", ShoppingSession.deleteSession);

module.exports = shoppingSessionRouter;
