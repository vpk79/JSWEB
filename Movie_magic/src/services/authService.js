const User = require('../Models/User')

exports.register = (userData) => User.create(userData);

exports.login = (email, password) => {
    
}