const { v1: uuidv1 } = require('uuid');
const Op = require('sequelize').Op;
const Address = require("../models/Address.model.js");

const getAddressList = async (req, res) => {
  try {
    const addresses = await Address.findAll();
    res.status(200).json(addresses);
  } catch (error) {
    res.json({error});
  }
};

const getUsersAddressList = async (req, res) => {
    try {
      const user_id = req.params.user_id;
      const addresses = await Address.findAll({ where: { user_id } });
      res.status(200).json(addresses);
    } catch (error) {
      res.json({error});
    }
  };

const createAddress = async(req, res) => {
    try {
        const id = uuidv1();
        const address = {
            id,
            ...req.body
        };
        const isAddressExist = await Address.findOne({ where: { ...address, name: address.name } });
        if(isAddressExist) return res.status(500).json({ error: "This address already exists." });
        const createdAddress = await Address.create(address);
        res.status(200).json(createdAddress);
    } catch (error) {
        res.json({error})
    };
};

const updateAddress = async(req, res) => {
    try {
        const addressId = req.params.address_id;
        const updatedParams = req.body;
        const updatedAddress = await Address.update({...updatedParams}, { where: { id: addressId } });
        res.status(200).json(updatedAddress);
    } catch(error) {
        res.json({ error })
    }
}

const deleteAddress = async(req, res) => {
    try {
        const id = req.params.address_id;
        const deletedAddress = await Address.destroy({ where: { id: id }});
        res.status(200).json(deletedAddress)
    } catch(error) {
        res.json({ error })
    }
};

module.exports = { getAddressList, getUsersAddressList, createAddress, updateAddress, deleteAddress };
