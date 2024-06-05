const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const {auth} = require('../middlewares/authMiddleware');

function configExpress(app) {
    // set express to user folder public for all static files
    app.use(express.static(path.resolve('src/public')));

    // intercept and parse any data coming with the request
    app.use(express.urlencoded({ extended: false }))

    app.use(cookieParser());

    app.use(auth);

    return app;
}


module.exports = configExpress;