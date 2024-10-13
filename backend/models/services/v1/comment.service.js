'use strict';

const Comments = require('../../schemas/v1/comments/comment.masters.schema');

const commentService = {
  createComment: function (data) {
    return new Promise(async (resolve, reject) => {
      try {
        let commentData = {
          user_master_id: data.userId,
          comment: data.comment,
          deleted: 'N',
        };
        commentData['created_at'] = new Date();

        let response = await Comments.create(commentData);

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

  updateComment: function (data) {
    return new Promise(async (resolve, reject) => {
      try {
        let commentData = { updated_at: new Date() };
        if (data?.comment) {
          commentData['comment'] = data.comment;
        }

        const response = await Comments.update(commentData, {
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

  removeComment: function (data) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await Comments.update(
          { deleted: 'Y', updated_at: new Date() },
          { where: { comment_master_id: data.id, deleted: 'N' } }
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

module.exports = commentService;
