'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    productId: DataTypes.INTEGER,
    reviews: DataTypes.INTEGER
  }, {
    classMethods: {}
  });
  return Product;
};
