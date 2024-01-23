'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
return sequelize.define('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER.UNSIGNED
  },
  fassetId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    unique: true
  },
  countryCode: {
    type: Sequelize.STRING
  },
  userName: {
    type: Sequelize.STRING
  },
}, {
  sequelize,
  tableName: 'users',
  timestamps: true,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'id' },
      ],
    },
  ],
});
};