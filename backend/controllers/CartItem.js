const CartItem = require("../models/CartItem.model.js");
const uuid = require("uuid");

const getCartItems = async (req, res) => {
  try {
    const session_id = req.params.session_id;
    const products = await CartItem.findAll({
      where: { session_id: session_id },
    });
    res.status(200).json(products);
  } catch (error) {
    res.json({ error });
  }
};

const createCartItem = async (req, res) => {
  try {
    const cartItem = req.body;
    const id = uuid.v1();
    const existingCartItem = await CartItem.findOne({
      where: {
        session_id: cartItem.session_id,
        product_id: cartItem.product_id,
        color: cartItem.color,
        size: cartItem.size,
      },
    });
    if (existingCartItem) {
      const updatedItem = await CartItem.update(
        { quantity: existingCartItem.quantity + 1 },
        { where: { id: existingCartItem.id } }
      );
      res.status(200).json(updatedItem);
    } else {
      const createdItem = await CartItem.create({
        id,
        ...cartItem,
      });
      res.status(200).json(createdItem);
    }
  } catch (error) {
    res.json({ error });
  }
};

const updateCartItem = async (req, res) => {
  try {
  const cartItemId = req.params.cartItemId;
  const updatedParams = req.body;
  await CartItem.update(
    { ...updatedParams },
    { where: { id: cartItemId } }
  );
  res.status(200);
  } catch(error) {
      res.json({ error })
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const id = req.params.cartItemId;
    const deletedItem = await CartItem.destroy({ where: { id: id } });
    res.status(200).json(deletedItem);
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  getCartItems,
  createCartItem,
  deleteCartItem,
  updateCartItem,
};
