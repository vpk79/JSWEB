const express = require('express');
const app = express();
const routes = require('./routes');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { authMiddleware } = require('./middlewares/authMiddleware');


app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(authMiddleware);

app.use(routes);

mongoose.connect('mongodb://localhost:27017/treasure-vault');

mongoose.connection.on('connected', () => console.log('DB is connected'));
mongoose.connection.on('error', (err) => console.log('err'));

app.listen(3000, ()=> console.log('Server is listening on port 3000...'))