const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const usersRouter = require("./routes/Users.routes.js");
const categoriesRouter = require("./routes/Categories.routes");
const productsRouter = require("./routes/Products.routes");
const shoppingSessionRouter = require("./routes/ShoppingSession.routes");
const cartItemRouter = require("./routes/CartItem.routes.js");
const addressRouter = require("./routes/Address.routes");
dotenv.config();
const app = express();
 
app.use(cors({ credentials: true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(usersRouter);
app.use(categoriesRouter);
app.use(productsRouter);
app.use(shoppingSessionRouter);
app.use(cartItemRouter);
app.use(addressRouter);

 
app.listen(3001, ()=> console.log('Server running at port 3001'));
