const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    createdStones: [{
        type: mongoose.Types.ObjectId,
        ref: 'Stone'
    }],

    likedStones: [{
        type: mongoose.Types.ObjectId,
        ref: 'Stone'
    }],
});

userSchema.pre('save', async function () {             // преди създаването на модела и save хешираме паролата
    this.password = await bcrypt.hash(this.password, 12)
});


const User = mongoose.model('User', userSchema);

module.exports = User;