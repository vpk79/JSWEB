// с помощта на Router() създаваме модулярен рутер
const router = require('express').Router();


router.get('/', (req, res) => {
    res.send('Hello world');
});


module.exports = router;