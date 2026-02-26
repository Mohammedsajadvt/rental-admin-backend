const Vendor = require('../models/Vendor');



exports.createVendor = async (req, res) => {
    try {
        if (!req.user?._id) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
        }

        const vendorData = {
            ...req.body,
            createdBy: req.user._id,
        };

        const vendor = new Vendor(vendorData);
        await vendor.save();

        const populated = await Vendor.findById(vendor._id).populate('createdBy', 'name email numberOfEquipments');

        res.status(201).json({
            success: true,
            data: populated,
        });
    } catch (err) {
        console.error('Create vendor error:', err);
        res.status(400).json({
            success: false,
            message: 'Failed to create vendor',
            error: err.message,
        });
    }
};


exports.getVendors = async (req, res) => {
    try {
        const {
            search = '',
            page = 1,
            limit = 20,
            sortBy = 'createdAt',
            order = 'desc',

        } = req.query;

        let query = {};

        if (search.trim()) {
            query.$or = [
                { name: { $regex: search.trim(), $options: 'i' } },
                { email: { $regex: search.trim(), $options: 'i' } },
            ];
        }

        const skip = (Number(page) - 1) * Number(limit);
        const sort = { [sortBy]: order === 'asc' ? 1 : -1 };

        const vendors = await Vendor.find(query).populate('createdBy', 'name email  numberOfEquipments')
            .sort(sort)
            .skip(skip)
            .limit(Number(limit));

        const total = await Vendor.countDocuments(query);

        res.json({
            success: true,
            count: vendors.length,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            data: vendors,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch vendors',
            error: err.message,
        });
    }
};



exports.getVendorsbyID = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id).populate('createdBy', 'name email numberOfEquipments');

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: 'Vendor not found',
            });
        }

        res.json({
            success: true,
            data: vendor,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message,
        });
    }
};

exports.updateVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: 'Vendor not found',
            });
        }

        const { createdBy, ...updateData } = req.body;

        Object.assign(vendor, updateData);


        await vendor.save();

        const updated = await Vendor.findById(req.params.id).populate('createdBy', 'name email');

        res.json({
            success: true,
            data: updated,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to update vendor',
            error: err.message,
        });
    }
};



exports.deleteVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: 'Vendor not found',
            });
        }

        await vendor.deleteOne();

        res.json({
            success: true,
            message: 'Vendor deleted successfully',
            deletedId: req.params.id,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete vendor',
            error: err.message,
        });
    }
};