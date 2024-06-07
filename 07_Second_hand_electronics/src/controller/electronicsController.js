const router = require('express').Router();
const electronicsService = require('../services/electronicsService');

const { isAuth } = require('../middlewares/authMiddleware');

router.get('/catalog', async (req, res) => {
    let electronics = await electronicsService.getAll();
    res.render('electronics/catalog', { electronics })
});

router.get('/create', (req, res) => {
    res.render('electronics/create')
});

router.post('/create', isAuth, async (req, res) => {
    try {
        await electronicsService.create({ ...req.body, owner: req.user._id });
        res.redirect('/electronics/catalog');
    } catch (error) {
        // console.log(error);
        res.render('electronics/create', { ...req.body, error: getErrorMessage(error) });
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
    let electronics = await electronicsService.getOne(req.params.electronicsId).lean();
    // let electronicsData = electronics.toObject();

    let isOwner = electronics.owner == req.user?._id;
    // let like = electronics.getLiked();
    // let isLiked = req.user && like.some(c => c._id == req.user?._id);

    res.render('electronics/details', { ...electronics, isOwner })
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

        res.redirect('/electronics/catalog');
    } catch (error) {
        res.render('electronics/create', {...req.body, error: getErrorMessage(error) });
    }

});

router.get('/:electronicsId/edit', async (req, res) => {
    let electronics = await electronicsService.getOne(req.params.electronicsId).lean();
    res.render('electronics/edit', { ...electronics })
});

router.post('/:electronicsId/edit', checkIsOwner, async (req, res) => {
    try {
        await electronicsService.updateOne(req.params.electronicsId, req.body);

        res.redirect(`/electronics/${req.params.electronicsId}/details`);
    } catch {
        console.log(getErrorMessage(error));
        res.render('electronics/create', { ...req.body, error: getErrorMessage(error) });
    }

});

router.get('/:electronicsId/like', isOwner, async (req, res) => {
    let electronics = await electronicsService.getOne(req.params.electronicsId);

    electronics.liked.push(req.user._id);
    await electronics.save();

    res.redirect(`/electronics/${req.params.electronicsId}/details`);
})

module.exports = router;