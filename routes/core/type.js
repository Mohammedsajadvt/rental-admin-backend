const express = require('express');
const router = express.Router();
const { createType, getTypes, getTypesByID, updateType, deleteType } = require('../../controllers/core/typeController');
const { auth } = require('../../middleware/auth');

router.use(auth);


router.route('/').post(createType).get(getTypes);

router.route('/:id').get(getTypesByID).put(updateType).delete(deleteType);


module.exports = router;