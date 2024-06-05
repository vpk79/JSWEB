const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 2,
        required: [true, 'Username is required'],

    },

    email: {
        type: String,
        minLength: 10,
        required: [true, 'Email is required'],
        unique: true,
    },

    password: {
        type: String,
        minLength: 4,
        required: [true, 'Password is required'],
    },

    createdCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }],

    signedUpCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }],
});

userSchema.pre('save', async function () {             // преди създаването на модело и save хешираме паролата
    this.password = await bcrypt.hash(this.password, 12)
});

// userSchema.virtual('rePassword')
//     .set(function(value){
//         if(value !== this.password){
//             throw new Error('Password mismatch');
//         }
//     })

const User = mongoose.model('User', userSchema);

module.exports = User;