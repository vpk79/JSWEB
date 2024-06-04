const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
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

// router.get('/:courseId/details', async (req, res) => {
//     const course = await courseService.getOneDetailed(req.params.courseId).lean();
//     const signUpUsers = course.signUpList.map(user => user.username).join(', ');
//     const isOwner = course.owner && course.owner._id == req.user?._id;
//     const isSigned = course.signUpList.some(user => user._id == req.user?._id)

//     res.render('courses/details', { ...course, signUpUsers, isOwner, isSigned });
// });

// router.get('/:courseId/sign-up', async (req, res) => {
//     await courseService.signUp(req.params.courseId, req.user._id);

//     res.redirect(`/courses/${req.params.courseId}/details`);
// })





// router.post('/:courseId/edit', isCourseOwner, async (req, res) => {
//     const courseData = req.body;

//     try {
//         await courseService.edit(req.params.courseId, courseData);
//         res.redirect(`/courses/${req.params.courseId}/details`);

//     } catch (error) {
//         res.render('courses/edit', { ...courseData, error: getErrorMessage(error) })
//     }
// });

// router.get('/:courseId/edit', isCourseOwner, async (req, res) => {

//     res.render('courses/edit', { ...req.course });
// });

// router.get('/:courseId/delete', isCourseOwner, async (req, res) => {

//     await courseService.delete(req.params.courseId);
//     res.redirect('/courses');
// });


module.exports = router;