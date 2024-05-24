const router = require('express').Router();
const movieService = require('../services/movieService')

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
   const newMovie = req.body;
    movieService.create(newMovie);
    res.send('Created new movie')
});





module.exports = router;