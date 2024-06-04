const router = require('express').Router();
const { isGuest, isAuth } = require('../middlewares/authMiddleware');
const { isStoneOwner } = require('../middlewares/stoneMiddleware');
const stoneService = require('../services/stoneService');
const { getErrorMessage } = require('../utils/errorUtils');



router.get('/dashboard', async (req, res) => {
    const stones = await stoneService.getAll().lean();
    res.render('stones/dashboard', { stones })
});

router.get('/create', isAuth, (req, res) => {
    res.render('stones/create');
});

router.post('/create', isAuth, async (req, res) => {
    const stoneData = req.body;

    try {
        await stoneService.create(req.user._id, stoneData);
        res.redirect('/stones/dashboard')

    } catch (error) {
        res.render('stones/create', { ...stoneData, error: getErrorMessage(error) });
    }
});

router.get('/:stoneId/details', async (req, res) => {
    let isLiked = false;
    let logged = req.user;
    const stone = await stoneService.getOneDetailed(req.params.stoneId).lean();
    isLiked = stone.likedList.some(user => user._id == req.user?._id);
    const isOwner = stone.owner && stone.owner._id == req.user?._id;

    res.render('stones/details', { ...stone, isLiked, isOwner, logged });
});

router.get('/:stoneId/like', async (req, res) => {
    let isLiked = false;
    const stone = await stoneService.getOneDetailed(req.params.stoneId).lean();
    isLiked = stone.likedList.some(user => user._id == req.user._id);

    if (isLiked) {
        res.redirect('/404')
    } else {
        stoneService.like(stone._id, req.user._id);
        res.redirect(`/stones/${stone._id}/details`);
    }
});

// router.get('/:stoneId/sign-up', async (req, res) => {
//     await stoneService.signUp(req.params.stoneId, req.user._id);

//     res.redirect(`/stones/${req.params.stoneId}/details`);
// })





router.post('/:stoneId/edit', isStoneOwner, async (req, res) => {
    const stoneData = req.body;

    try {
        await stoneService.edit(req.params.stoneId, stoneData);
        res.redirect(`/stones/${req.params.stoneId}/details`);

    } catch (error) {
        res.render('stones/edit', { ...stoneData, error: getErrorMessage(error) })
    }
});

router.get('/:stoneId/edit', isStoneOwner, async (req, res) => {

    res.render('stones/edit', { ...req.stone });
});

router.get('/:stoneId/delete', isStoneOwner, async (req, res) => {

    await stoneService.delete(req.params.stoneId);
    res.redirect(`/stones/dashboard`);
});


router.get('/search', async (req, res) => {
    const { name } = req.query;
    console.log(name);
    const allStones = !name ? await stoneService.getAll().lean() : await stoneService.search(name).lean();
    console.log(allStones);
    res.render('stones/search', { allStones });

});

module.exports = router;