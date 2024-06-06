
const volcanoService = require('../services/volcanoService');



async function isVolcanoOwner(req, res, next) {
    const volcano = await volcanoService.getOne(req.params.volcanoId).lean();

    if (volcano.owner != req.user?._id) {
        return res.redirect(`/volcanoes/${req.params.volcanoId}/details`);
    }

    req.volcano = volcano;

    next();
}

exports.isVolcanoOwner = isVolcanoOwner;