const User = require('../models/User');


exports.register = (userData) => User.create(userData); // връща promise със обработените данни