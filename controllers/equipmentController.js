const mongoose = require('mongoose');
const Equipment = require('../models/Equipment');

exports.createEquipment = async (req, res) => {
    try {
        if (!req.user?._id) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
        }
        const { title, type, description = '', keySpecs = [] } = req.body;

        if (!title?.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Title is required',
            });
        }

        if (!type) {
            return res.status(400).json({
                success: false,
                message: 'Type is required (must be a valid MasterType ID)',
            });
        }
        if (!mongoose.Types.ObjectId.isValid(type)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Type ID format',
            });
        }
        const equipmentData = {
            title: title.trim(),
            type,
            description: description.trim(),
            keySpecs,
            createdBy: req.user._id,
        };

        const newEquipment = new Equipment(equipmentData);
        await newEquipment.save();

        const populatedEquipment = await Equipment.findById(newEquipment._id)
            .populate('createdBy', 'title type')
            .lean();

        return res.status(201).json({
            success: true,
            message: 'Equipment created successfully',
            data: populatedEquipment,
        });
    } catch (err) {
        console.error('Create Equipment Error:', err);

        if (err.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid data format (likely wrong Type ID)',
                error: err.message,
            });
        }

        if (err.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: Object.values(err.errors).map(e => e.message),
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Server error while creating equipment',
            error: err.message,
        });

    }
};



exports.getEquipment = async (req, res) => {
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
                { title: { $regex: search.trim(), $options: 'i' } },
            ];
        }

        const skip = (Number(page) - 1) * Number(limit);
        const sort = { [sortBy]: order === 'asc' ? 1 : -1 };


        const equipment = await Equipment.find(query).populate('createdBy', 'title type').sort(sort)
            .skip(skip)
            .limit(Number(limit));

        const total = await Equipment.countDocuments(query);

        res.json({
            success: true,
            count: equipment.length,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            data: equipment,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch Equipment',
            error: err.message,
        });
    }
};


exports.getEquipmentByID = async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id).populate('createdBy', 'title type');
        if (!equipment) {
            return res.status(404).json({
                success: false,
                message: 'Equipment not found',
            });
        }

        res.json({
            success: true,
            data: equipment,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message,
        });
    }
};


exports.updateEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id);
        if (!equipment) {
            return res.status(404).json({
                success: false,
                message: 'Equipment not found',
            });
        }

        const { createdBy, ...updateData } = req.body;

        Object.assign(equipment, updateData);


        await equipment.save();

        const updated = await Equipment.findById(req.params.id).populate('createdBy', 'title type');
        res.json({
            success: true,
            data: updated,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to update equipment',
            error: err.message,
        });
    }

};

exports.deleteEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id);
        if (!equipment) {
            return res.status(404).json({
                success: false,
                message: 'Equipment not found',
            });
        }

        await equipment.deleteOne();

        res.json({
            success: true,
            message: 'Equipment deleted successfully',
            deletedId: req.params.id,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete equipment',
            error: err.message,
        });
    }
};