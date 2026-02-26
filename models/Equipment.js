const mongoose = require('mongoose');


const keySpecSchema = new mongoose.Schema({
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    weight: { type: String },
});

const equipmentSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
    },
    description: { type: String, required: true, trim: true },
    keySpecs: [keySpecSchema],
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

module.exports = mongoose.model('Equipment', equipmentSchema);