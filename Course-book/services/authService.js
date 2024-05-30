const bcrypt = require('bcrypt');

const User = require('../models/User');


exports.register = (userData) => {
    if(userData.password !== userData.rePassword){
        throw new Error('Password mismatch');
    }

    return User.create(userData); // връща promise със обработените данни
}

exports.login = async ({email, password}) => {

    const user = await User.findOne({email});  // намираме юзера по email

    if(!user){                                                          
        throw new Error('Invalid email or password')  
    }

    const isValid = await bcrypt.compare(password, user.password);  // проверяваме дали паролата му е вярна

    if(!isValid){
        throw new Error('Invalid email or password')
    }
}