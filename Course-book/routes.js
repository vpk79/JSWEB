// с помощта на Router() създаваме модулярен рутер
const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');

router.use(homeController);
router.use('/auth', authController);



module.exports = router;