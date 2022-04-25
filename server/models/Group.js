const sequelize = require("../config/db");
const {DataTypes} = require("sequelize");
const User = require("./User");

const Group = sequelize.define("Group", {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    group_name:{type:DataTypes.STRING, required:true, unique:true},
    group_type:{type:DataTypes.INTEGER, required:true, defaultValue:0},
});

Group.hasMany(User);
User.belongsTo(Group);

module.exports = Group;
