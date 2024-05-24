
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const routes = require('./routes')

const app = express();
const port = 5000;

// set handlebars as view engine and configurate it
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}))

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))

// set express to user folder public for all static files
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes);



// run server on port
app.listen(port, () => console.log(`Server is listening on port ${port}...`));

