const Cast = require('../Models/Cast');
const Movie = require('../Models/Movie')

exports.getAll = () => Cast.find();
exports.create = (castData) => Cast.create(castData);
exports.getByIds = (castIds) => {
    const casts = Cast.find({ _id: { $in: castIds }});

    return casts;
}   