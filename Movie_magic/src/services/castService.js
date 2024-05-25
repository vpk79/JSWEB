const Cast = require('../Models/Cast');


exports.getAll = () => Cast.find();
exports.create = (castData) => Cast.create(castData);