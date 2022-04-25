const sequelize = require("../config/db");
const {DataTypes} = require("sequelize");
const User = require("./User");

const Token = sequelize.define("Token", {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    user_id:{type:DataTypes.INTEGER, required:true},
    refreshToken:{type:DataTypes.STRING, required:true},
});

Token.hasOne(User);
User.belongsTo(Token);

module.exports = Token;
