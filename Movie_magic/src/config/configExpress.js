const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

function configExpress(app) {
    // set express to user folder public for all static files
    app.use(express.static(path.resolve('src/public')));

    // intercept and parse any data coming with the request
    app.use(express.urlencoded({ extended: false }))

    app.use(cookieParser());

    return app;
}


module.exports = configExpress;