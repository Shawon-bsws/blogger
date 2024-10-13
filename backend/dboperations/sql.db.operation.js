'use strict';

const Sequelize = require('../configs/mysql.connection');
const { getSequelizeQueryType } = require('../helpers/helperFunctions');

module.exports = {
  SQLQUERY(moduleData) {
    return new Promise(async (resolve, reject) => {
      try {
        let transaction = moduleData.transaction || null;
        let result = await Sequelize.query(moduleData.sql, {
          transaction,
          type: getSequelizeQueryType(moduleData.type),
        });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  },
};
