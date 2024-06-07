const router = require('express').Router();
const electronicsService = require('../services/electronicsService');

const { isAuth } = require('../middlewares/authMiddleware');

router.get('/catalog', async (req, res) => {
    let electronics = await electronicsService.getAll();
    res.render('electronics/catalog', { electronics })
});

router.get('/add-electronics', (req, res) => {
    res.render('electronics/create')
});

router.post('/add-electronics', isAuth, async (req, res) => {
    try {
        await electronicsService.create({ ...req.body, owner: req.user._id });
        res.redirect('/electronics/dashboard');
    } catch (error) {
        console.log(error);
        res.render('electronics/create', { error: getErrorMessage(error) });
    }
});

function getErrorMessage(error) {
    let errorsArr = Object.keys(error.errors);

    if (errorsArr.length > 0) {
        return error.errors[errorsArr[0]];
    } else {
        return error.message
    }

}

router.get('/:electronicsId/details', async (req, res) => {
    let electronics = await electronicsService.getOne(req.params.electronicsId);
    let electronicsData = await electronics.toObject();

    let isOwner = electronicsData.owner == req.user?._id;
    let like = electronics.getLiked();
    let isLiked = req.user && like.some(c => c._id == req.user?._id);

    res.render('electronics/details', { ...electronicsData, isOwner, isLiked })
});

async function isOwner(req, res, next) {
    let electronics = await electronicsService.getOne(req.params.electronicsId);

    if (electronics.owner == req.user._id) {
        res.redirect(`/electronics/${req.params.electronicsId}details/`);
    } else {
        next();
    }
}

async function checkIsOwner(req, res, next) {
    let electronics = await electronicsService.getOne(req.params.electronicsId);

    if (electronics.owner == req.user._id) {
        next();
    } else {
        res.redirect(`/electronics/${req.params.electronicsId}/details`);
    }
};

router.get('/:electronicsId/delete', checkIsOwner, async (req, res) => {
    try {
        await electronicsService.delete(req.params.electronicsId);

        res.redirect('/electronics/dashboard');
    } catch (error) {
        res.render('electronics/create', { error: getErrorMessage(error) });
    }

});

router.get('/:electronicsId/edit', async (req, res) => {
    let electronics = await electronicsService.getOne(req.params.electronicsId);
    res.render('electronics/edit', { ...electronics.toObject() })
});

router.post('/:electronicsId/edit', checkIsOwner, async (req, res) => {
    try {
        await electronicsService.updateOne(req.params.electronicsId, req.body);

        res.redirect(`/electronics/${req.params.electronicsId}/details`);
    } catch {
        console.log(getErrorMessage(error));
        res.render('electronics/create', { error: getErrorMessage(error) });
    }

});

router.get('/:electronicsId/like', isOwner, async (req, res) => {
    let electronics = await electronicsService.getOne(req.params.electronicsId);

    electronics.liked.push(req.user._id);
    await electronics.save();

    res.redirect(`/electronics/${req.params.electronicsId}/details`);
})

module.exports = router;