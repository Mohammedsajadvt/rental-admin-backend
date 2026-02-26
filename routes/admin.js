const express = require('express');
const { register, login } = require('../controllers/adminAuth');
const { auth} = require('../middleware/auth');


const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin authentication and profile
 */


/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Admin]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthBody'
 *     responses:
 *       200:
 *         description: JWT token valid for 1h
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg: { type: string, example: 'User exists' }
 *       500:
 *         description: Server error
 */
router.post('/register', register);
/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Login and receive a JWT
 *     tags: [Admin]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthBody'
 *     responses:
 *       200:
 *         description: JWT token valid for 7d
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg: { type: string, example: 'Invalid credentials' }
 *       500:
 *         description: Server error
 */
router.post('/login', login);
/**
 * @swagger
 * /api/admin/profile:
 *   get:
 *     summary: Get the logged-in admin's profile
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       401:
 *         description: Unauthorized – missing or invalid token
 */
router.get('/profile', auth, (req, res) => res.json({ email:req.user.email,role: req.user.role }));

module.exports = router;