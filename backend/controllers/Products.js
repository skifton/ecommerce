const uuid = require('uuid');
const Products = require("../models/Products.model.js");

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.json({error});
  }
};

const getSpecialCategoryProducts = async (req, res) => {
    try {
        const nameOfCategory = req.params.categoryName;
        const productList = await Products.findAll({ where: { category: nameOfCategory } });
        res.status(200).json(productList);
    } catch (error) {
        res.json(error)
    }
}

const getProduct = async(req, res) => {
    try {
        const id = req.params.productId;
        const product = await Products.findByPk(id);
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({error});
    }
};

const createProduct = async(req, res) => {
    try {
        const product = req.body;
        const existingProduct = await Products.findOne({ where: { name: product.name } });
        if(existingProduct) return res.status(500).json({ error: "A product with this name already exists." });
        const id = uuid.v1();
        const createdProduct = await Products.create({
            id,
            ...product,
        });
        res.status(200).json(createdProduct);
    } catch (error) {
        res.json({error})
    };
};

const updateProduct = async(req, res) => {
    try {
        const updatedProductId = req.params.productId;
        const updatedParams = req.body;
        const updatedProduct = await Products.update({...updatedParams}, { where: { id: updatedProductId } });
        res.status(200).json(updatedProduct);
    } catch(error) {
        res.json({ error })
    }
}

const deleteProduct = async(req, res) => {
    try {
        const id = req.params.productId;
        const deletedProduct = await Products.destroy({ where: { id: id }});
        res.status(200).json(deletedProduct)
    } catch(error) {
        res.json({ error })
    }
};

module.exports = { getAllProducts, getSpecialCategoryProducts, getProduct, createProduct, updateProduct, deleteProduct };
