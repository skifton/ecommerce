const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const { DataTypes } = Sequelize;

const Address = db.define('address',{
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apartment: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 1,
    },
    postalCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
module.exports = Address;