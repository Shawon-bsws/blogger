'use strict';

const config = require('../configs/config');
const { SQLQUERY } = require('../dboperations/sql.db.operation');
const statusCode = require('../helpers/statusCode');
const constants = require('../helpers/constants');
const jwt = require('jsonwebtoken');

module.exports = {
  handler: async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return res.status(statusCode.Forbidden).json({
          status: false,
          message: 'Auth failed',
        });
      }
      let authorization = req.headers.authorization;
      if (authorization.includes('Bearer')) {
        authorization = authorization.split(' ')[1];
      }

      let verify = await jwt.verify(authorization, config.SECRETE);
      console.log(verify);
      if (verify) {
        req.userId = verify.id;
        req.name = verify.name;
      }
      if (!verify) {
        console.log('from auth js');
        return res.status(statusCode.Unauthorized).json({
          status: false,
          message: 'Authorization failure!',
        });
      }
      next();
    } catch (err) {
      console.log(err);
      return res.status(statusCode.Unauthorized).json({
        status: false,
        message: 'Authorization failure!',
      });
    }
  },
};
