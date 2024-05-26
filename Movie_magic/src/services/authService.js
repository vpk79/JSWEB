const User = require('../Models/User');
const bcrypt = require('bcrypt');

exports.register = (userData) => User.create(userData);

exports.login = async (email, password) => {
    // get user from db
    const user = await  User.findOne({email});

    // check if user exists
    if(!user) {
        throw new Error('User doesn\'t exist')
    }

    // check if password is valid
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        throw new Error('Password doesn\'t match');
    }
}