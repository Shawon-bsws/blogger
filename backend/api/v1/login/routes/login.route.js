'use strict';

const express = require('express');
const loginController = require('../controller/login.controller');
const statusCode = require('../../../../helpers/statusCode');
const auth = require('../../../../middleware/auth');
const router = express.Router();

router.post('/login', loginController.login);

router.get('/logout', auth.handler, loginController.logout);

router.post('/verifyToken', auth.handler, loginController.verifyToken);

router.use((req, res, next) => {
  return res.status(statusCode.Not_Found).json({ message: 'not found' });
});

module.exports = router;
