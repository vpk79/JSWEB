const Movie = require('../Models/Movie');

exports.getAll = () => {
    const movies = Movie.find();
    return movies;
}

exports.search = async (title, genre, year) => {
    let result = await Movie.find().lean();

    if (title) {
        result = result.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
    }

    if (genre) {
        result = result.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
    }

    if (year) {
        result = result.filter(movie => movie.year === year);
    }

    return result;
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