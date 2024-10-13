'use strict';

const express = require('express');
const routes = express.Router();

//Routes
const login = require('../api/v1/login/routes/login.route');
const user = require('../api/v1/users/routes/user.route');
const blogs = require('../api/v1/blogs/routes/blogs.route');
const comment = require('../api/v1/comments/routes/comment.route');

//Initializing the routes
routes.use('/app', login);
routes.use('/user', user);
routes.use('/blogs', blogs);
routes.use('/comment', comment);

routes.use((req, res, next) => {
  return res.status(400).json({ message: 'Bad request' });
});

module.exports = routes;
