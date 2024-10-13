'use strict';

const express = require('express');
const wishlistsController = require('../controller/wishlist.controller');
const auth = require('../../../../middleware/auth');
const { upload } = require('../../../../middleware/multer');
const router = express.Router();

/**
 * @swagger
 *  securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 * tags:
 *   name: Wishlist
 *   description: Wishlist related operations
 */

/**
 * @swagger
 * /v1/wishlist/list/{id}:
 *   get:
 *     summary: Get a wishlist products of a user
 *     description: Get a wishlist products of a user
 *     tags: [Wishlist]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User id
 *         schema:
 *           type: integer
 *         required: true
 *       - name: page
 *         in: query
 *         description: Page number
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Limit per page
 *         schema:
 *           type: integer
 *       - name: order
 *         in: query
 *         description: Order type (e.g., asc, desc)
 *         schema:
 *           type: string
 *       - name: column
 *         in: query
 *         description: Column name for sorting
 *         schema:
 *           type: string
 */

router.get('/list/:id',auth.handler, wishlistsController.viewWishList);

/**
 * @swagger
 * /v1/wishlist/create:
 *   post:
 *     summary: Create a wishlist
 *     description: Create a wishlist
 *     tags: [Wishlist]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *             example:
 *               productId: 1
 *               userId: 1
 *
 */

router.post(
  '/create',
  auth.handler,
  // auth.isAuthorized,
  wishlistsController.createWishlist
);

/**
 * @swagger
 * /v1/wishlist/remove/{id}:
 *   delete:
 *     summary: Delete a wishlist
 *     description: Delete a wishlist
 *     tags: [Wishlist]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 */
router.delete(
  '/remove/:id',
  auth.handler,
  // auth.isAuthorized,
  wishlistsController.removeWishlist
);

router.use((req, res, next) => {
  return res.status(400).json({ message: 'Bad request' });
});

module.exports = router;
