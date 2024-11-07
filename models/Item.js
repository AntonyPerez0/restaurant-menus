const { Sequelize, sequelize } = require("../db");

const Item = sequelize.define("Item", {
  name: Sequelize.STRING,
  image: Sequelize.STRING,
  price: Sequelize.FLOAT,
  vegetarian: Sequelize.BOOLEAN,
});

module.exports = { Item };
