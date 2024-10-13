'use strict';

const statusCode = require('../../../../helpers/statusCode');
const userService = require('../../../../models/services/v1/user.service');

const userController = {
  viewUserById: async (req, res, next) => {
    try {
      const response = await userService.viewUserById({ id: req.params.id });

      if (response.success) {
        return res.status(statusCode.OK).json({
          status: true,
          message: 'User Details',
          data: response.data,
          documentStatus: response.documentStatus,
        });
      } else {
        return res
          .status(statusCode.Bad_Request)
          .json({ status: false, message: 'No User Found' });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const userInfo = {
        username: req?.body?.username,
        password: req?.body?.password,
        email: req?.body?.email,
      };

      const response = await userService.createUser(userInfo);

      if (response.success) {
        return res.status(statusCode.Created).json({
          status: true,
          message: 'User Data Created',
        });
      } else {
        return res
          .status(statusCode.Bad_Request)
          .json({ status: false, message: 'Something Went Wrong' });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      let userInfo = {
        id: req.params.id,
        username: req?.body?.username,
        password: req?.body?.password,
        email: req?.body?.email,
      };

      const response = await userService.updateUser(userInfo);

      if (response.success) {
        return res
          .status(statusCode.OK)
          .json({ status: true, message: 'User Data Updated' });
      } else {
        return res
          .status(statusCode.Bad_Request)
          .json({ status: false, message: 'Something Went Wrong' });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  removeUser: async (req, res, next) => {
    try {
      const response = await userService.removeUser({
        id: req.params.id,
      });

      if (response.success) {
        return res
          .status(statusCode.OK)
          .json({ status: true, message: 'User Data Removed' });
      } else {
        return res
          .status(statusCode.Bad_Request)
          .json({ status: false, message: 'Something Went Wrong' });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

module.exports = userController;
