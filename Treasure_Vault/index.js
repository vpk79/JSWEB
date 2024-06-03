const express = require('express');
const app = express();


app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(5000, ()=> console.log('Server is listening on port 5000...'))