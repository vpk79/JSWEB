const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const User = require('../models/User');
const { SECRET } = require('../config');

exports.register = async (userData) => {
    if (userData.password !== userData.rePassword) {
        throw new Error('Password mismatch');
    }

    const user = await User.findOne({ email: userData.email });

    if (user) {
        throw new Error('User already exist');
    }

    const createdUser = await User.create(userData);

    const token = await generateToken(createdUser);

    return token;
}

exports.login = async ({ email, password }) => {

    const user = await User.findOne({ email });  // намираме юзера по email

    if (!user) {
        throw new Error('Invalid email or password')
    }

    const isValid = await bcrypt.compare(password, user.password);  // проверяваме дали паролата му е вярна

    if (!isValid) {
        throw new Error('Invalid email or password')
    }

    const token = await generateToken(user);

    return token;

}

function generateToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
    }

    return jwt.sign(payload, SECRET, { expiresIn: '2h' });
}