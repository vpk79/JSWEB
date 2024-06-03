const express = require('express');
const handlebars = require('express-handlebars');
const routes = require('./routes'); 
const mongoose = require('mongoose');
const app = express();


app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/treasure-vault');

mongoose.connection.on('connected', () => console.log('DB is connected'));
mongoose.connection.on('error', (err) => console.log('err'));

app.use(routes);

app.listen(3000, ()=> console.log('Server is listening on port 3000...'))