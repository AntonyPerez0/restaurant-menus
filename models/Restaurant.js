const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Restaurant = sequelize.define("Restaurant", {
  name: DataTypes.STRING,
  location: DataTypes.STRING,
  cuisine: DataTypes.STRING,
});

module.exports = {
  Restaurant,
};
