const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const { isVolcanoOwner } = require('../middlewares/volcanoMIddleware');
const volcanoService = require('../services/volcanoService');
const { getErrorMessage } = require('../utils/errorUtils');



router.get('/', async (req, res) => {
    const volcanoes = await volcanoService.getAll().lean();
    res.render('volcanoes/catalog', { volcanoes })
});

router.get('/:volcanoId/details', async (req, res) => {
    const volcano = await volcanoService.getOneDetailed(req.params.volcanoId).lean();
    const signUpUsers = volcano.signUpList.map(user => user.username).join(', ');
    const isOwner = volcano.owner && volcano.owner._id == req.user?._id;
    const isSigned = volcano.signUpList.some(user => user._id == req.user?._id)

    res.render('volcanoes/details', { ...volcano, signUpUsers, isOwner, isSigned });
});

router.get('/:volcanoId/sign-up', async(req, res) => {
  await  volcanoService.signUp(req.params.volcanoId, req.user._id);

  res.redirect(`/volcanoes/${req.params.volcanoId}/details`);
})

router.get('/create', isAuth, (req, res) => {
    res.render('volcanoes/create');
});

router.post('/create', isAuth, async (req, res) => {
    const volcanoData = req.body;

    try {
        await volcanoService.create(req.user._id, volcanoData);
        res.redirect('/volcanoes')

    } catch (error) {
        res.render('volcanoes/create', { ...volcanoData, error: getErrorMessage(error) });
    }
});

router.post('/:volcanoId/edit', isVolcanoOwner, async (req, res) =>{
    const volcanoData = req.body;

    try {
        await volcanoService.edit(req.params.volcanoId, volcanoData);
        res.redirect(`/volcanoes/${req.params.volcanoId}/details`);

    } catch (error) {
        res.render('volcanoes/edit', {...volcanoData, error: getErrorMessage(error)})
    }
});

router.get('/:volcanoId/edit', isVolcanoOwner, async (req, res) => {
    
    res.render('volcanoes/edit', {...req.volcano});
});

router.get('/:volcanoId/delete', isVolcanoOwner, async (req, res) => {
   
    await volcanoService.delete(req.params.volcanoId);
    res.redirect('/volcanoes');
});


module.exports = router;