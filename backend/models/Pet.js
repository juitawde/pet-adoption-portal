const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    type: {
        type: String,
        enum: ['dog', 'cat', 'bird', 'rabbit', 'small-animal', 'fish', 'other'],
        required: true
    },

    breed: {
        type: String,
        required: true,
        trim: true
    },

    age: {
        type: Number,
        required: true,
        min: 0
    },

    ageUnit: {
        type: String,
        enum: ['months', 'years'],
        default: 'years'
    },

    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },

    size: {
        type: String,
        enum: ['Small', 'Medium', 'Large'],
        required: true
    },

    color: {
        type: String,
        default: ''
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        default: ''
    },

    description: {
        type: String,
        required: true
    },

    personality: [{
        type: String
    }],
    //square bracket indicates that personality is an array of strings

    vaccinated: {
        type: Boolean,
        default: false
    },

    sterilized: {
        type: Boolean,
        default: false
    },

    adoptionStatus: {
        type: String,
        enum: ['available', 'under_review', 'adopted'],
        default: 'available'
    },

    shelter: {
        type: String,
        required: true
    },

    shelterContact: {
        type: String,
        default: ''
    },

    images: [{
        type: String
    }]
}, {
    timestamps: true
});

petSchema.index({
    type: 1,
    adoptionStatus: 1,
    city: 1
});

module.exports = mongoose.model('Pet', petSchema);