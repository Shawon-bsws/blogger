'use strict';

const bcrypt = require('bcrypt');
const config = require('../configs/config');
const { Sequelize } = require('sequelize');
const fs = require('fs');

module.exports = {
  getSequelizeType: (type) => {
    switch (type) {
      case 'number':
        return Sequelize.INTEGER;
      case 'text':
        return Sequelize.TEXT;
      case 'string':
        return Sequelize.STRING;
      case 'phone':
        return Sequelize.STRING;
      case 'email':
        return Sequelize.STRING;
      case 'bool':
        return Sequelize.BOOLEAN;
      case 'date':
        return Sequelize.DATE;
      case 'datetime':
        return Sequelize.DATE;
      case 'image':
        return Sequelize.STRING;
      case 'file':
        return Sequelize.STRING;
      case 'password':
        return Sequelize.STRING;
      case 'system':
        return Sequelize.STRING;
      case 'list':
        return Sequelize.STRING;
      case 'boolean':
      case 'delete':
        return Sequelize.ENUM('Y', 'N');
      default:
        return Sequelize.STRING;
    }
  },

  getSequelizeQueryType: (type) => {
    switch (type) {
      case 'SELECT':
        return Sequelize.QueryTypes.SELECT;
      case 'UPDATE':
        return Sequelize.QueryTypes.UPDATE;
    }
  },

  generateRandomString: function (length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  },

  encryptPassword: async function (password) {
    try {
      const salt = await bcrypt.genSalt(config.SALTROUND);
      console.log({ password, salt });
      const hashedPassword = await bcrypt.hash(password, salt);

      return hashedPassword;
    } catch (error) {
      console.error(error);
      throw new Error('Error encrypting password');
    }
  },

  comparePassword: async function (inputPassword, hashedPassword) {
    try {
      const match = await bcrypt.compare(inputPassword, hashedPassword);
      return match;
    } catch (error) {
      throw new Error('Error comparing passwords');
    }
  },
};
