const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const { DataTypes } = Sequelize;

const Products = db.define('products',{
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    size: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    },
    color: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
module.exports = Products;