const express = require('express');
const router = express.Router();
const { createVendor, getVendors, getVendorsbyID, updateVendor, deleteVendor } = require('../controllers/vendorController');
const { auth} = require('../middleware/auth');


router.use(auth);


router.route('/').post(createVendor).get(getVendors);

router.route('/:id').get(getVendorsbyID).put(updateVendor).delete(deleteVendor);


module.exports = router;

