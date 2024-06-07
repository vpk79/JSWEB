const router = require('express').Router();

const electronicsService = require('../services/electronicsService');

router.get('/', async (req, res) => {
    // let stone = await electronicsService.findTheThree();
    // stone = stone.slice(0, 3);
    res.render('home');
});

router.get('/search', async (req, res) => {
    let name = req.query.name;
    let type = req.query.type;

    let result = await electronicsService.search({name, type});

    if (!name && !type) {
        result = await electronicsService.getAll();
    }

    res.render('search', { result })
})

module.exports = router;