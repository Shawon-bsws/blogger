'use strict';

const UsersSession = require('../../schemas/v1/users/user.session');

const userSessionService = {
  getUserSessionById: function (data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await UsersSession.findAll({
          where: { user_master_id: data.userId, is_active: 'Y' },
        });
        if (response.length > 0) {
          resolve({ success: true, data: response });
        } else {
          resolve({ success: false });
        }
      } catch (error) {
        reject(error);
      }
    });
  },

  createUserSession: function (data) {
    return new Promise(async (resolve, reject) => {
      try {
        let userSessionData = {
          user_master_id: data.userId,
          user_token: data.token,
          is_active: 'Y',
        };
        userSessionData['created_at'] = new Date();

        const response = await UsersSession.create(userSessionData);
        if (response) {
          resolve({ success: true, data: response });
        } else {
          resolve({ success: false });
        }
      } catch (error) {
        reject(error);
      }
    });
  },

  updateUserSession: function (data) {
    return new Promise(async (resolve, reject) => {
      try {
        let userSessionData = {
          is_active: 'N',
          updated_by: data.userId,
          updated_at: new Date(),
        };

        const response = await UsersSession.update(userSessionData, {
          where: {
            user_master_id: data.userId,
            user_token: data.token,
            is_active: 'Y',
          },
        });
        if (response) {
          resolve({ success: true });
        } else {
          resolve({ success: false });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = userSessionService;
