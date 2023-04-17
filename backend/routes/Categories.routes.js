const express = require("express");
const Categories = require("../controllers/Categories");
const categoriesRouter = express.Router();

categoriesRouter.get("/categories", Categories.getAllCategories);
categoriesRouter.get("/categories/:categoryId", Categories.getCategory)
categoriesRouter.post("/categories", Categories.createCategory);
categoriesRouter.patch("/categories/:categoryId", Categories.updateCategory);
categoriesRouter.delete("/categories/:categoryId", Categories.deleteCategory);

module.exports = categoriesRouter;

