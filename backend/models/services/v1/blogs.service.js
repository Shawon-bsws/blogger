'use strict';

const config = require('../../../configs/config.js');
const { SQLQUERY } = require('../../../dboperations/sql.db.operation.js');
const constants = require('../../../helpers/constants.js');

const Blogs = require('../../schemas/v1/blogs/blogs.master.schema.js');

const blogsService = {
  blogsList: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let limit = config.VIEWDEFAULTVALUE.LIMIT;
        let orderType = config.VIEWDEFAULTVALUE.ORDER;
        let orderCol = config.VIEWDEFAULTVALUE.ORDERCOLUMN;
        let page = config.VIEWDEFAULTVALUE.PAGE;

        const totalCount = await Blogs.findAndCountAll({
          where: {
            deleted: 'N',
          },
        });

        if (data.limit) {
          limit = data.limit;
        }
        if (data.orderType) {
          orderType = data.orderType.toUpperCase();
        }
        if (data.orderCol) {
          orderCol = data.orderCol;
        }
        if (data.page) {
          page = data.page;
        }

        const offset = (page - 1) * limit;

        let sql = `SELECT 
                    bm.blog_master_id,
                    bm.blog_title, 
                    um.user_master_id,
                    um.user_name,
                    bm.created_at
                  FROM blog_masters bm
                  LEFT JOIN 
                    user_masters um ON bm.user_master_id = um.user_master_id
                  WHERE bm.deleted = 'N'`;

        if (data?.searchKeyWord) {
          sql += ` AND bm.blog_title LIKE '%${data.searchKeyWord}%' OR um.user_name LIKE '%${data.searchKeyWord}%'`;
        }
        sql += ` ORDER BY
                        bm.${orderCol} ${orderType}
                    LIMIT ${limit} OFFSET ${offset};
                    `;

        let response = await SQLQUERY({ sql, type: constants.select });

        if (response) {
          resolve({
            success: true,
            recordsTotal: totalCount.count,
            recordsFiltered: response.length,
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

  blogsListByUserId: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let limit = config.VIEWDEFAULTVALUE.LIMIT;
        let orderType = config.VIEWDEFAULTVALUE.ORDER;
        let orderCol = config.VIEWDEFAULTVALUE.ORDERCOLUMN;
        let page = config.VIEWDEFAULTVALUE.PAGE;

        const totalCount = await Blogs.findAndCountAll({
          where: {
            deleted: 'N',
            user_master_id: data.id,
          },
        });

        if (data.limit) {
          limit = data.limit;
        }
        if (data.orderType) {
          orderType = data.orderType.toUpperCase();
        }
        if (data.orderCol) {
          orderCol = data.orderCol;
        }
        if (data.page) {
          page = data.page;
        }

        const offset = (page - 1) * limit;

        let sql = `SELECT 
                    bm.blog_master_id,
                    bm.blog_title, 
                    um.user_master_id,
                    um.user_name,
                    bm.created_at
                  FROM blog_masters bm
                  LEFT JOIN 
                    user_masters um ON bm.user_master_id = um.user_master_id
                  WHERE bm.deleted = 'N' AND bm.user_master_id = ${data.id}`;

        if (data?.searchKeyWord) {
          sql += ` AND bm.blog_title LIKE '%${data.searchKeyWord}%' OR um.user_name LIKE '%${data.searchKeyWord}%'`;
        }
        sql += ` ORDER BY
                        bm.${orderCol} ${orderType}
                    LIMIT ${limit} OFFSET ${offset};
                    `;

        let response = await SQLQUERY({ sql, type: constants.select });

        if (response) {
          resolve({
            success: true,
            recordsTotal: totalCount.count,
            recordsFiltered: response.length,
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

  viewBlogById: function (data) {
    return new Promise(async (resolve, reject) => {
      try {
        let sql = `SELECT 
                      bm.blog_master_id,
                      bm.blog_title,
                      bm.blog_detail, 
                      um.user_master_id AS blog_author_id,
                      um.user_name AS blog_author_name,
                      bm.created_at,
                      IFNULL(
                          CONCAT('[', GROUP_CONCAT(
                              CONCAT(
                                  '{"comment_master_id": ', cm.comment_master_id, 
                                  ', "comment": "', cm.comment, '"',
                                  ', "comment_date": "', IFNULL(cm.created_at, ''), '"',
                                  ', "comment_user_id": ', IFNULL(cum.user_master_id, 'null'),
                                  ', "comment_user_name": "', IFNULL(cum.user_name, 'null'), '"}'
                              )
                          SEPARATOR ', '), ']'), '[]'
                      ) AS comments
                  FROM blog_masters bm
                  LEFT JOIN user_masters um ON bm.user_master_id = um.user_master_id
                  LEFT JOIN blog_comment_maps bcm ON bm.blog_master_id = bcm.blog_master_id
                  LEFT JOIN comment_masters cm ON bcm.comment_master_id = cm.comment_master_id
                  LEFT JOIN user_masters cum ON cm.user_master_id = cum.user_master_id
                  WHERE bm.blog_master_id = ${data.id}
                    AND bm.deleted = 'N'
                    AND (cm.deleted = 'N' OR cm.deleted IS NULL)
                  GROUP BY bm.blog_master_id, bm.blog_title, um.user_master_id, um.user_name;`;

        let response = await SQLQUERY({ sql, type: constants.select });

        if (response.length > 0) {
          resolve({ success: true, data: response[0] });
        } else {
          resolve({ success: false });
        }
      } catch (error) {
        reject(error);
      }
    });
  },

  createBlogs: function (data) {
    return new Promise(async (resolve, reject) => {
      try {
        let blogData = {
          user_master_id: data.userId,
          blog_title: data.title,
          blog_detail: data.details,
          deleted: 'N',
        };

        blogData['created_by'] = blogData['updated_by'] = data.userId;
        blogData['created_at'] = new Date();
        let response = await Blogs.create(blogData);

        if (response) {
          resolve({ success: true, data: response });
        } else {
          resolve({ success: false });
        }
      } catch (error) {
        reject(error);
      }
    });
  },

  updateBlogs: function (data) {
    return new Promise(async (resolve, reject) => {
      try {
        let blogData = { updated_at: new Date() };
        if (data?.title) {
          blogData['blog_title'] = data.title;
        }
        if (data?.details) {
          blogData['blog_detail'] = data.details;
        }

        const response = await Blogs.update(blogData, {
          where: {
            blog_master_id: data.id,
          },
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

  removeBlogs: function (data) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await Blogs.update(
          { deleted: 'Y', updated_at: new Date() },
          { where: { blog_master_id: data.id, deleted: 'N' } }
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

module.exports = blogsService;
