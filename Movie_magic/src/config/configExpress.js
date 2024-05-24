const express = require('express');
const path = require('path');

function configExpress(app) {
    // set express to user folder public for all static files
    app.use(express.static(path.join(__dirname, 'public')));

    return app;
}


module.exports = configExpress;