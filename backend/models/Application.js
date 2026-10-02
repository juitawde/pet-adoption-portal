const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    homeType: {
        type: String,
        required: true
    },

    experience: {
        type: String,
        required: true
    },

    reason: {
        type: String,
        required: true
    },

    message: {
        type: String,
        default: ''
    },

    status: {
        type: String,
        enum: ['pending', 'under_review', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

applicationSchema.index({ user: 1, pet: 1 });

module.exports = mongoose.model('Application', applicationSchema);