const mongoose = require('mongoose');

const stoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    color: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    formula: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    createdAt: Date,

    likedList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

stoneSchema.pre('save', function () {
    if (!this.createdAt) {
        this.createdAt = Date.now();
    }
});


const Stone = mongoose.model('Stone', stoneSchema);

module.exports = Stone;
