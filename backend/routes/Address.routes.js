const express = require("express");
const Address = require("../controllers/Address");
const addressRouter = express.Router();

addressRouter.get("/address", Address.getAddressList);
addressRouter.get("/address/:user_id", Address.getUsersAddressList);
addressRouter.post("/address", Address.createAddress)
addressRouter.put("/address/:address_id", Address.updateAddress);
addressRouter.delete("/address/:address_id", Address.deleteAddress);

module.exports = addressRouter;
