'use strict';

const express = require('express');
const userController = require('../controller/user.controller');
const auth = require('../../../../middleware/auth');
const router = express.Router();

router.post('/create', userController.createUser);

router.get('/info/:id', auth.handler, userController.viewUserById);

router.delete('/remove/:id', auth.handler, userController.removeUser);

router.put('/update/:id', auth.handler, userController.updateUser);

router.use((req, res, next) => {
  return res.status(400).json({ message: 'Bad request' });
});

module.exports = router;
