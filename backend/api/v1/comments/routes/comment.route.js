'use strict';

const express = require('express');
const commentController = require('../controller/comments.controller');
const auth = require('../../../../middleware/auth');
const router = express.Router();

router.post('/create', auth.handler, commentController.createComment);

router.delete('/remove/:id', auth.handler, commentController.removeComment);

router.put('/update/:id', auth.handler, commentController.updateComment);

router.use((req, res, next) => {
  return res.status(400).json({ message: 'Bad request' });
});

module.exports = router;
