const express = require('express');
const router = express.Router();
const { createType, getTypes, getTypesByID, updateType, deleteType } = require('../../controllers/core/typeController');
const { auth } = require('../../middleware/auth');

router.use(auth); // Applies to all routes below

/**
 * @swagger
 * tags:
 *   name: Types
 *   description: Master/Type management endpoints (categories, equipment types, etc.)
 */

/**
 * @swagger
 * /api/types:
 *   post:
 *     summary: Create a new Type
 *     tags: [Types]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TypeBody'
 *     responses:
 *       201:
 *         description: Type created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type'
 *       400:
 *         description: Bad request (validation error)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.route('/').post(createType);

/**
 * @swagger
 * /api/types:
 *   get:
 *     summary: Get all Types
 *     tags: [Types]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/searchParam'
 *       - $ref: '#/components/parameters/pageParam'
 *       - $ref: '#/components/parameters/limitParam'
 *       - $ref: '#/components/parameters/sortByParam'
 *       - $ref: '#/components/parameters/orderParam'
 *     responses:
 *       200:
 *         description: List of types (paginated)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 count: { type: integer, example: 10 }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Type'
 *       401:
 *         description: Unauthorized
 */
router.route('/').get(getTypes);

/**
 * @swagger
 * /api/types/{id}:
 *   get:
 *     summary: Get a single Type by ID
 *     tags: [Types]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Type ObjectId
 *     responses:
 *       200:
 *         description: Type found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type'
 *       404:
 *         description: Type not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id').get(getTypesByID);

/**
 * @swagger
 * /api/types/{id}:
 *   put:
 *     summary: Update a Type by ID
 *     tags: [Types]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TypeBody'
 *     responses:
 *       200:
 *         description: Type updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Type not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id').put(updateType);

/**
 * @swagger
 * /api/types/{id}:
 *   delete:
 *     summary: Delete a Type by ID
 *     tags: [Types]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Type deleted successfully
 *       404:
 *         description: Type not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id').delete(deleteType);

module.exports = router;