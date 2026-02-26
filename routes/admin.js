const express = require('express');
const { register, login } = require('../controllers/adminAuth');
const { auth} = require('../middleware/auth');


const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, (req, res) => res.json({ email:req.user.email,role: req.user.role }));

module.exports = router;