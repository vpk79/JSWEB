const express = require('express');
const path = require('path');

function configExpress(app) {
    // set express to user folder public for all static files
    app.use(express.static(path.resolve('src/public')));

    return app;
}


module.exports = configExpress;