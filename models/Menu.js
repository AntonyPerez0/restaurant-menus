const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Menu = sequelize.define("Menu", {
  title: DataTypes.STRING,
});

module.exports = {
  Menu,
};
