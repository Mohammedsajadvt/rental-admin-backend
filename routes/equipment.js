const express = require('express');
const router = express.Router();
const {createEquipment,getEquipment,getEquipmentByID,deleteEquipment, updateEquipment} = require('../controllers/equipmentController');
const { auth} = require('../middleware/auth');


router.use(auth);


router.route('/').post(createEquipment).get(getEquipment);

router.route('/:id').get(getEquipmentByID).put(updateEquipment).delete(deleteEquipment);

module.exports = router;
