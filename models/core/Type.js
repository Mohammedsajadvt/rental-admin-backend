const mongoose = require('mongoose');


const typeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

module.exports = mongoose.model('Type',typeSchema);