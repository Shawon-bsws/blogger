'use strict';
const statuscode = require('../../../../helpers/statusCode');
const loginService = require('../../../../models/services/v1/login.service');

const loginController = {
  login: async (req, res, next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const response = await loginService.userLogin({ email, password });
      if (response.success) {
        res.status(statuscode.OK).json({
          status: true,
          message: 'Login success',
          data: response.data,
        });
      } else {
        res
          .status(statuscode.Bad_Request)
          .json({ status: false, message: 'Wrong Credential' });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      const response = await loginService.userLogout(authHeader);
      if (response.success) {
        res
          .status(statuscode.OK)
          .json({ status: true, message: 'Successfully Logout' });
      } else {
        res
          .status(statuscode.Method_Not_Allowed)
          .json({ status: false, message: 'Something Went Wrong' });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  verifyToken: async (req, res, next) => {
    try {
      console.log(req.body);

      const response = await loginService.verifyToken(req.body.token);
      if (response.success) {
        res.status(statuscode.OK).json({
          status: true,
          message: 'Token Verified',
          data: response.data,
        });
      } else {
        res
          .status(statuscode.Method_Not_Allowed)
          .json({ status: false, message: 'Something Went Wrong' });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

module.exports = loginController;
