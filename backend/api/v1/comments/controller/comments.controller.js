'use strict';

const statusCode = require('../../../../helpers/statusCode');
const commentService = require('../../../../models/services/v1/comment.service');

const commentController = {
  createComment: async (req, res, next) => {
    try {
      const commentInfo = {
        comment: req?.body?.comment,
        userId: req.userId,
      };

      const response = await commentService.createComment(commentInfo);

      if (response.success) {
        return res.status(statusCode.OK).json({
          status: true,
          message: 'Comment Created',
          data: response.data,
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

  updateComment: async (req, res, next) => {
    try {
      const commentInfo = {
        comment: req?.body?.comment,
        userId: req.userId,
        id: req.params.id,
      };

      const response = await commentService.updateComment(commentInfo);

      if (response.success) {
        return res.status(statusCode.OK).json({
          status: true,
          message: 'Comment Updated',
          data: response.data,
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

  removeComment: async (req, res, next) => {
    try {
      const response = await commentService.removeComment({
        id: req.params.id,
        userId: req.userId,
      });

      if (response.success) {
        return res
          .status(statusCode.OK)
          .json({ status: true, message: 'Comment Removed' });
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

module.exports = commentController;
