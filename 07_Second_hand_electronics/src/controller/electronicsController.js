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
        console.log(error);
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

router.get('/:electronicsId/details', checkIsBuyed, async (req, res) => {
    let electronics = req.electronics;
    let isOwner = electronics.owner == req.user?._id;
    let isBuyed = req.isBuyed;
    res.render('electronics/details', { ...electronics, isOwner, isBuyed })
});

async function isOwner(req, res, next) {
    let electronics = await electronicsService.getOne(req.params.electronicsId);

    if (electronics.owner == req.user._id) {
        res.redirect(`/electronics/${req.params.electronicsId}/details/`);
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

async function checkIsBuyed(req, res, next) {
    let electronics = await electronicsService.getOne(req.params.electronicsId).lean();
    let buyList = electronics.buyingList;
    let isBuyed = req.user && buyList.some(c => c._id == req.user?._id);
    req.isBuyed = isBuyed;
    req.electronics = electronics;
    next();
}

router.get('/:electronicsId/delete', checkIsOwner, async (req, res) => {
    try {
        await electronicsService.delete(req.params.electronicsId);

        res.redirect('/electronics/catalog');
    } catch (error) {
        res.render('electronics/create', { ...req.body, error: getErrorMessage(error) });
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

router.get('/:electronicsId/buy', isOwner, checkIsBuyed, async (req, res) => {
    let isBuyed = req.isBuyed;
    
    if (isBuyed) {
        res.redirect(`/electronics/${req.params.electronicsId}/details`);
    } else {
        await electronicsService.buy(req.params.electronicsId, req.user._id);
        // let electronics = await electronicsService.getOne(req.params.electronicsId);
        // electronics.buyingList.push(req.user._id);
        // await electronics.save();

        res.redirect(`/electronics/${req.params.electronicsId}/details`);
    }

})

module.exports = router;