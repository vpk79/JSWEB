const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const { isCourseOwner } = require('../middlewares/courseMIddleware');
const courseService = require('../services/courseService');
const { getErrorMessage } = require('../utils/errorUtils');



router.get('/', async (req, res) => {
    const courses = await courseService.getAll().lean();
    res.render('courses/catalog', { courses })
});

router.get('/:courseId/details', async (req, res) => {
    const course = await courseService.getOneDetailed(req.params.courseId).lean();
    const signUpUsers = course.signUpList.map(user => user.username).join(', ');
    const isOwner = course.owner && course.owner._id == req.user?._id;
    const isSigned = course.signUpList.some(user => user._id == req.user?._id)

    res.render('courses/details', { ...course, signUpUsers, isOwner, isSigned });
});

router.get('/:courseId/sign-up', async(req, res) => {
  await  courseService.signUp(req.params.courseId, req.user._id);

  res.redirect(`/courses/${req.params.courseId}/details`);
})

router.get('/create', isAuth, (req, res) => {
    res.render('courses/create');
});

router.post('/create', isAuth, async (req, res) => {
    const courseData = req.body;

    try {
        await courseService.create(req.user._id, courseData);
        res.redirect('/courses')

    } catch (error) {
        res.render('courses/create', { ...courseData, error: getErrorMessage(error) });
    }
});

router.post('/:courseId/edit', isCourseOwner, async (req, res) =>{
    const courseData = req.body;

    try {
        await courseService.edit(req.params.courseId, courseData);
        res.redirect(`/courses/${req.params.courseId}/details`);

    } catch (error) {
        res.render('courses/edit', {...courseData, error: getErrorMessage(error)})
    }
});

router.get('/:courseId/edit', isCourseOwner, async (req, res) => {
    
    res.render('courses/edit', {...req.course});
});

router.get('/:courseId/delete', isCourseOwner, async (req, res) => {
   
    await courseService.delete(req.params.courseId);
    res.redirect('/courses');
});


module.exports = router;