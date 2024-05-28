const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.register = (userData) => {
    const user = User.findOne({email: userData.email});
        if(user){
            throw new Error('Email already exist');
        }
   return User.create(userData);
}

exports.login = async (email, password) => {
    // get user from db
    const user = await  User.findOne({email});

    // check if user exists
    if(!user) {
        throw new Error('No such user or password')
    }

    // check if password is valid
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        throw new Error('No such user or password');
    }

    //generate jwt token
    const payload = {
        _id: user._id,
        email: user.email,
    }
    const token = await jwt.sign(payload, SECRET, {expiresIn: '2h'});

    return token;
}