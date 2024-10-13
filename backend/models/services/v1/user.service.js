'use strict';

const Users = require('../../schemas/v1/users/user.master.schema');
const helperFunctions = require('../../../helpers/helperFunctions');

const userService = {
  viewUserById: function (data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Users.findOne({
          where: { user_master_id: data.id },
        });

        if (response) {
          resolve({
            success: true,
            data: response,
          });
        } else {
          resolve({ success: false });
        }
      } catch (error) {
        reject(error);
      }
    });
  },

  createUser: function (data) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(data);

        let userData = {
          user_name: data.username,
          user_email: data.email,
        };

        userData['user_password'] = await helperFunctions.encryptPassword(
          data.password
        );

        userData['created_at'] = new Date();

        let response = await Users.create(userData);

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

  updateUser: function (data) {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = { updated_at: new Date() };
        if (data?.username) {
          userData['user_name'] = data.username;
        }
        if (data?.password) {
          userData['user_password'] = await helperFunctions.encryptPassword(
            data.password
          );
        }
        if (data?.email) {
          userData['user_email'] = data.email;
        }

        const response = await Users.update(userData, {
          where: { user_master_id: data.id, deleted: 'N' },
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

  removeUser: function (data) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await Users.update(
          { deleted: 'Y', updated_at: new Date() },
          { where: { user_master_id: data.id, deleted: 'N' } }
        );

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

module.exports = userService;
