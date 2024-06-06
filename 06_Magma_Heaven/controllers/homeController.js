const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const volcanoService = require('../services/volcanoService');
const userService = require('../services/userService');

router.get('/', async (req, res) => {
    const latestVolcanoes = await volcanoService.getLatest().lean();
    res.render('home', { latestVolcanoes });
})

router.get('/profile', isAuth, async (req, res) => {
    const user = await userService.getInfo(req.user._id).lean();
    const createdVolcanoCount = user.createdVolcanoes.length;
    const signUpVolcanoesCount = user.signedUpVolcanoes.length;
    res.render('profile', { user, createdVolcanoCount, signUpVolcanoesCount });
});


router.get('/search', async (req, res) => {
    const { name, type } = req.query;
    const volcanoes = await volcanoService.search(name, type).lean();
    res.render('search', { name, type});
})

module.exports = router;