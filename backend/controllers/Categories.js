const Categories = require("../models/Categories.model.js");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.json({error});
  }
};

const getCategory = async(req, res) => {
    try {
        const name = req.params.categoryId;
        const category = await Categories.findOne({ where: { name: name } });
        res.status(200).json(category);
    } catch (error) {
        res.json({error});
    }
};

const createCategory = async(req, res) => {
    try {
        const newCategory = req.body;
        const existingCategory = await Categories.findOne({ where: { name: newCategory.name } });
        if(existingCategory) return res.status(500).json({ error: "A category with this name already exists." });
        const createdCategory = await Categories.create(newCategory);
        res.status(200).json(createdCategory);
    } catch (error) {
        res.json({error})
    };
};

const updateCategory = async(req, res) => {
    try {
        const updatedCategoryId = req.params.categoryId;
        const updatedParams = req.body;
        const updatedCategory = await Categories.update({...updatedParams}, { where: { id: updatedCategoryId } });
        res.status(200).json(updatedCategory);
    } catch(error) {
        res.json({ error })
    }
}

const deleteCategory = async(req, res) => {
    try {
        const id = req.params.categoryId;
        const deletedCategory = await Categories.destroy({ where: { id: id }});
        res.status(200).json(deletedCategory)
    } catch(error) {
        res.json({ error })
    }
};

module.exports = { getAllCategories, getCategory, createCategory, updateCategory, deleteCategory };
