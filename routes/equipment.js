const express = require('express');
const router = express.Router();
const { createEquipment, getEquipment, getEquipmentByID, deleteEquipment, updateEquipment } = require('../controllers/equipmentController');
const { auth } = require('../middleware/auth');

router.use(auth);

/**
 * @swagger
 * tags:
 *   name: Equipments
 *   description: Equipment management
 */

/**
 * @swagger
 * /api/equipments:
 *   get:
 *     summary: Get all equipments (paginated)
 *     tags: [Equipments]
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
 *         description: Paginated list of equipments (search matches title)
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/PaginatedMeta'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Equipment'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   post:
 *     summary: Create a new equipment
 *     tags: [Equipments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EquipmentBody'
 *           example:
 *             title: "Excavator XL"
 *             type: "64abc123def456ghi789jkl0"
 *             description: "Heavy duty excavator for large sites"
 *             keySpecs: ["500HP", "20-ton", "Hydraulic arm"]
 *     responses:
 *       201:
 *         description: Equipment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: 'Equipment created successfully' }
 *                 data:
 *                   $ref: '#/components/schemas/Equipment'
 *       400:
 *         description: Validation error (missing title, invalid type ID, etc.)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: false }
 *                 message: { type: string }
 *                 errors:
 *                   type: array
 *                   items: { type: string }
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.route('/').get(getEquipment).post(createEquipment);

/**
 * @swagger
 * /api/equipments/{id}:
 *   get:
 *     summary: Get equipment by ID
 *     tags: [Equipments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: MongoDB ObjectId of the equipment
 *     responses:
 *       200:
 *         description: Equipment found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/Equipment'
 *       404:
 *         description: Equipment not found
 *       500:
 *         description: Server error
 *
 *   put:
 *     summary: Update an equipment (createdBy is ignored)
 *     tags: [Equipments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EquipmentBody'
 *     responses:
 *       200:
 *         description: Equipment updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/Equipment'
 *       400:
 *         description: Update failed
 *       404:
 *         description: Equipment not found
 *
 *   delete:
 *     summary: Delete an equipment
 *     tags: [Equipments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Equipment deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: 'Equipment deleted successfully' }
 *                 deletedId: { type: string }
 *       404:
 *         description: Equipment not found
 *       500:
 *         description: Server error
 */
router.route('/:id').get(getEquipmentByID).put(updateEquipment).delete(deleteEquipment);

module.exports = router;