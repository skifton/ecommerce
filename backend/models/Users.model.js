const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cart: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    orders: {
        type: DataTypes.STRING,
        allowNull: null,
    },
    status: {
        type: DataTypes.STRING, 
        enum: ['Pending', 'Active'],
        defaultValue: 'Pending',
    },
    role: {
        type: DataTypes.STRING,
        enum: ['Admin', 'User'],
        defaultValue: 'User',
    },
    confirmationCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
module.exports = Users;