const router = require('express').Router();
const stoneService = require('../services/stoneService');

router.get('/', async (req, res) => {
    const latestStones = await stoneService.getLatest().lean();
    res.render('home', { latestStones });
});



module.exports = router;