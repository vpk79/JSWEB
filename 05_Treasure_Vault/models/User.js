const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minLength: [10, "Email is shorter than 10 characters"],
        required: [true, "Email is required"],
        unique: true
    },

    password: {
        type: String,
        minLength: [4,"Password is shorter than 4 characters"],
        required: [true, "Password is required"]
    },

    addedStones: [{
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