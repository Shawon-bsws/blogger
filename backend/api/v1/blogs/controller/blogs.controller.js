'use strict';

const statusCode = require('../../../../helpers/statusCode');
const blogsService = require('../../../../models/services/v1/blogs.service');

const blogController = {
  viewBlogsList: async (req, res, next) => {
    try {
      const dataObj = {
        page: req.query.page,
        limit: req.query.limit,
        orderType: req.query.order,
        orderCol: req.query.column,
        searchKeyWord: req?.query?.search,
      };

      const response = await blogsService.blogsList(dataObj);

      if (response.success) {
        return res.status(statusCode.OK).json({
          status: true,
          message: 'Blogs List',
          recordsTotal: response.recordsTotal,
          recordsFiltered: response.recordsFiltered,
          data: response.data,
        });
      } else {
        return res
          .status(statusCode.Bad_Request)
          .json({ status: false, message: 'No Blogs Found' });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  viewBlogsByUserId: async (req, res, next) => {
    try {
      const dataObj = {
        page: req.query.page,
        limit: req.query.limit,
        orderType: req.query.order,
        orderCol: req.query.column,
        searchKeyWord: req?.query?.search,
        id: req?.params?.id,
      };

      const response = await blogsService.blogsListByUserId(dataObj);

      if (response.success) {
        return res.status(statusCode.OK).json({
          status: true,
          message: 'Blogs List',
          recordsTotal: response.recordsTotal,
          recordsFiltered: response.recordsFiltered,
          data: response.data,
        });
      } else {
        return res
          .status(statusCode.Bad_Request)
          .json({ status: false, message: 'No Blogs Found' });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  viewBlogById: async (req, res, next) => {
    try {
      const response = await blogsService.viewBlogById({
        id: req.params.id,
      });

      if (response.success) {
        return res.status(statusCode.OK).json({
          status: true,
          message: 'Blog Details',
          data: response.data,
        });
      } else {
        return res
          .status(statusCode.Bad_Request)
          .json({ status: false, message: 'No Blog Found' });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  createBlogs: async (req, res, next) => {
    try {
      const blogInfo = {
        title: req?.body?.title,
        details: req?.body?.details,
        userId: req.userId,
      };

      const response = await blogsService.createBlogs(blogInfo);

      if (response.success) {
        return res.status(statusCode.OK).json({
          status: true,
          message: 'Blog Created',
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

  updateBlogs: async (req, res, next) => {
    try {
      const blogInfo = {
        title: req?.body?.title,
        details: req?.body?.details,
        userId: req.userId,
        id: req.params.id,
      };

      const response = await blogsService.updateBlogs(blogInfo);

      if (response.success) {
        return res.status(statusCode.OK).json({
          status: true,
          message: 'Blog Updated',
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

  removeBlogs: async (req, res, next) => {
    try {
      const response = await blogsService.removeBlogs({
        id: req.params.id,
        userId: req.userId,
      });

      if (response.success) {
        return res
          .status(statusCode.OK)
          .json({ status: true, message: 'Blog Removed' });
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

  productSchema: async (req, res, next) => {
    try {
      const response = await blogsService.productSchema();

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

  referenceProductsDropDown: async (req, res, next) => {
    try {
      const response = await blogsService.referenceProductsDropDown();
      if (response.success) {
        return res.status(statusCode.OK).json({
          status: true,
          data: response.data,
        });
      } else {
        return res.status(statusCode.Not_Found).json({
          status: false,
          message: 'No Data Found',
          data: response.data,
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  updateProductStock: async (req, res, next) => {
    try {
      const dataObj = {
        userId: req.userId,
        id: req.params.id,
        productQuantity: req?.body?.productQuantity,
        orderQuantity: req?.body?.orderQuantity,
      };

      const response = await blogsService.updateProductStock(dataObj);
      if (response.success) {
        return res.status(statusCode.OK).json({
          status: true,
          message: 'Product Stock Updated',
        });
      } else {
        return res.status(statusCode.Bad_Request).json({
          status: false,
          message: 'Something went wrong',
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  variantDropdown: async (req, res, next) => {
    const response = await blogsService.variantDropdown();
    if (response.success) {
      return res.status(statusCode.OK).json({
        success: true,
        data: response.data,
      });
    } else {
      return res.status(statusCode.OK).json({
        success: false,
      });
    }
  },
};

module.exports = blogController;
