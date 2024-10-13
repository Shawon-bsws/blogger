'use strict';

const statusCode = require('../../../../helpers/statusCode');
const wishlistService = require('../../../../models/services/v1/wishlist.service');
const config = require('../../../../configs/config');

const userController = {
  viewWishList: async (req, res, next) => {
    try {
      const dataObj = {
        page: req.query.page,
        limit: req.query.limit,
        orderType: req.query.order,
        orderCol: req.query.column,
        token: req?.headers?.authorization,
        userId: req?.params?.userId,
        user_type : req?.type
      };
      // console.log(req?.body?.userId);

      const response = await wishlistService.productWishlist(dataObj);

      if (response.success) {
        return res.status(statusCode.OK).json({
          status: true,
          message: 'Wish List',
          recordsTotal: response.recordsTotal,
          recordsFiltered: response.recordsFiltered,
          data: response.data,
        });
      } else {
        return res
          .status(statusCode.Bad_Request)
          .json({ status: false, message: 'No Product Found' });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  createWishlist: async (req, res, next) => {
    try {
      const productInfo = {
        product_master_id: req?.body?.productMasterId,
        user_master_id: req?.body?.userMasterId,
      };

      const response = await wishlistService.createWishlist(productInfo);

      if (response.success) {
        return res.status(statusCode.OK).json({
          status: true,
          message: 'Wishhlist Data Created',
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

  removeWishlist: async (req, res, next) => {
    try {
      const response = await wishlistService.removeWislistData({
        id: req.params.id,
        // userId: req.userId,
      });

      if (response.success) {
        return res
          .status(statusCode.OK)
          .json({ status: true, message: 'Product Data Removed' });
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

  wishListSchema: async (req, res, next) => {
    try {
      const response = await wishlistService.wishlistSchema();

      if (response.success) {
        return res.status(statusCode.OK).json({
          status: true,
          message: response.message,
          data: response.data,
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

module.exports = userController;
