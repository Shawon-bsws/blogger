'use strict';

const config = require('../../../configs/config');
const jwt = require('jsonwebtoken');
const { SQLQUERY } = require('../../../dboperations/sql.db.operation');
const constants = require('../../../helpers/constants');
const helperFunctions = require('../../../helpers/helperFunctions');
const userSessionService = require('./user.session.service');

const loginService = {
  userLogin: function (data) {
    return new Promise(async (resolve, reject) => {
      try {
        let sql = `SELECT user_master_id,user_name,user_email,user_password FROM user_masters WHERE user_email = '${data.email}' AND deleted = "N" LIMIT 1;`;
        let response = await SQLQUERY({ sql, type: constants.select });
        if (response.length > 0) {
          let passCheck = await helperFunctions.comparePassword(
            data.password,
            response[0].user_password
          );
          if (passCheck) {
            let sessionRes = await userSessionService.getUserSessionById({
              userId: response[0].user_master_id,
            });
            if (sessionRes.success) {
              sessionRes.data.forEach((element) => {
                userSessionService.updateUserSession({
                  userId: response[0].user_master_id,
                  token: element.user_token,
                });
              });
            }
            const payload = {
              id: response[0].user_master_id,
              name: response[0].user_name,
            };
            jwt.sign(
              payload,
              config.SECRETE,
              { expiresIn: '2d' },
              (err, token) => {
                if (err) {
                  throw err;
                } else {
                  userSessionService.createUserSession({
                    userId: response[0].user_master_id,
                    token,
                  });
                  resolve({ success: true, data: token });
                }
              }
            );
          } else {
            resolve({ success: false, message: 'Wrong credential' });
          }
        } else {
          resolve({ success: false, message: 'Wrong credential' });
        }
      } catch (error) {
        console.error('user login error in service', error);
        reject(error);
      }
    });
  },

  userLogout: function (data) {
    return new Promise(async (resolve, reject) => {
      try {
        jwt.verify(data, config.SECRETE, (err, decoded) => {
          if (err) {
            throw err;
          } else {
            userSessionService.updateUserSession({
              userId: decoded.id,
              token: data,
            });
            resolve({ success: true });
          }
        });
      } catch (error) {
        console.error('user logout error in service', error);
        reject(error);
      }
    });
  },

  verifyToken: function (data) {
    return new Promise(async (resolve, reject) => {
      try {
        jwt.verify(data, config.SECRETE, (err, decoded) => {
          if (err) {
            throw err;
          } else {
            resolve({ success: true, data: decoded });
          }
        });
      } catch (error) {
        console.error('user logout error in service', error);
        reject(error);
      }
    });
  },
};

module.exports = loginService;
