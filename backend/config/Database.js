const { Sequelize } = require("sequelize");
 
const db = new Sequelize('ecemmerceDB', 'root', 'Root_pwd1', {
    host: "127.0.0.1",
    dialect: "mysql"
});
 
module.exports = db;