'use strict';

const express = require('express');
const blogsController = require('../controller/blogs.controller');
const auth = require('../../../../middleware/auth');
const router = express.Router();

router.get('/list', blogsController.viewBlogsList);

router.get('/list/:id', auth.handler, blogsController.viewBlogsByUserId);

router.post('/create', auth.handler, blogsController.createBlogs);

router.get('/info/:id', blogsController.viewBlogById);

router.delete('/remove/:id', auth.handler, blogsController.removeBlogs);

router.put('/update/:id', auth.handler, blogsController.updateBlogs);

router.use((req, res, next) => {
  return res.status(400).json({ message: 'Bad request' });
});

module.exports = router;
