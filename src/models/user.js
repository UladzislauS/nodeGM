'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    classMethods: {}
  });
  return User;
};
