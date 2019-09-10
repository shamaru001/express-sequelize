'use strict';
const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
  const post = sequelize.define('post', {
    name: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  post.associate = function(models) {
    // associations can be defined here
  };
  return post;
};