const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const { DataTypes } = Sequelize;

const ShoppingSession = db.define('shopping-session',{
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
module.exports = ShoppingSession;