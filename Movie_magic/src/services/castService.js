const Cast = require('../Models/Cast');
const Movie = require('../Models/Movie')

exports.getAll = () => Cast.find();
exports.create = (castData) => Cast.create(castData);
exports.getMovieById = async (movieId) => {
    const movie = await Movie.findById(movieId);
    const casts = await Cast.find({_id: {$in: movie.casts}});

    return casts;
}   