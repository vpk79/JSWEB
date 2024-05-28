const Movie = require('../Models/Movie');

exports.getAll = () => {
    const movies = Movie.find();
    return movies;
}

exports.search =  (title, genre, year) => {
    let query = {};

    if(title){ query.title = new RegExp(title, 'i')}
    if(genre) {query.genre = genre.toLowerCase()}
    if(year){ query.year = year}

    return Movie.find(query);
}

exports.getOne = (movieId) => {
    const movie = Movie.findById(movieId);
    return movie;
}

exports.create = async (movieData) => {
    const result = await Movie.create(movieData);

    return result;
};

exports.attach =  async (movieId, castId) => {
    // return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
    const movie = await this.getOne(movieId);

    movie.casts.push(castId);

    return movie.save();

}

exports.delete = (movieId) => Movie.findByIdAndDelete(movieId);