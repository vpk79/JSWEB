const router = require('express').Router();


router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
   const newMovie = req.body;
   
    res.send('Created new movie')
});





module.exports = router;