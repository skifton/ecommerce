const express = require("express");
const Users = require("../controllers/Users");
const usersMiddleware = require("../middleware/VerifyToken");
const CartItem = require("../controllers/CartItem");
const usersControl = require("../controllers/RefreshToken");
const usersRouter = express.Router();

usersRouter.get("/users", Users.getUsers);
usersRouter.post("/confirmation", Users.ConfirmEmail)
usersRouter.post("/users", Users.Register);
usersRouter.post("/login", Users.Login);
usersRouter.get("/token", usersControl.refreshToken);
usersRouter.delete("/logout", Users.Logout);

module.exports = usersRouter;
