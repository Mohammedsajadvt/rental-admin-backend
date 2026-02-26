const Type = require('../../models/core/Type');



exports.createType = async (req, res) => {
    try {
        if (!req.user?._id) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
        }

        const typeData = {
            ...req.body,
            createdBy: req.user._id,
        };

        const type = new Type(typeData);
        await type.save();


        const populated = await Type.findById(type._id).populate('createdBy', 'name');
        res.status(201).json({
            success: true,
            data: populated,
        });
    } catch (err) {
        console.error('Create type error:', err);
        res.status(400).json({
            success: false,
            message: 'Failed to create type',
            error: err.message,
        });
    }
};


exports.getTypes = async (req, res) => {
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
            ];
        }

        const skip = (Number(page) - 1) * Number(limit);
        const sort = { [sortBy]: order === 'asc' ? 1 : -1 };


        const types = await Type.find(query).populate('createdBy', 'name').sort(sort)
            .skip(skip)
            .limit(Number(limit));

        const total = await Type.countDocuments(query);

        res.json({
            success: true,
            count: types.length,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            data: types,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch types',
            error: err.message,
        });
    }
};


exports.getTypesByID = async (req, res) => {
    try {
        const type = await Type.findById(req.params.id).populate('createdBy', 'name');

        if (!type) {
            return res.status(404).json({
                success: false,
                message: 'Type not found',
            });
        }

        res.json({
            success: true,
            data: type,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message,
        });
    }
};

exports.updateType = async (req, res) => {
    try {
        const type = await Type.findById(req.params.id);
        if (!type) {
            return res.status(404).json({
                success: false,
                message: 'Type not found',
            });
        }

        const { createdBy, ...updateData } = req.body;

        Object.assign(type, updateData);


        await type.save();

        const updated = await Type.findById(req.params.id).populate('createdBy', 'name');

        res.json({
            success: true,
            data: updated,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to update type',
            error: err.message,
        });
    }
};

exports.deleteType = async (req, res) => {
    try {
        const type = await Type.findById(req.params.id);
        if (!type) {
            return res.status(404).json({
                success: false,
                message: 'Type not found',
            });
        }

        await type.deleteOne();

        res.json({
            success: true,
            message: 'type deleted successfully',
            deletedId: req.params.id,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete type',
            error: err.message,
        });
    }
};
