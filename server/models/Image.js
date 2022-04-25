const sequelize = require("../config/db");
const {DataTypes} = require("sequelize");

const Image = sequelize.define("Image", {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    path:{type:DataTypes.STRING, required:true},
});

module.exports = Image;
