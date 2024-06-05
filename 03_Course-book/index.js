const express = require('express');
const app = express();
const routes = require('./routes');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { authMiddleware } = require('./middlewares/authMiddleware');

// слагаме за middleware - настройка да използва папка public за статичните файлове
app.use(express.static('public'));

// още един middleware - body parser който позволява данните от формите да пристигнат в req.body парстнати
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
// middleware за автентикация
app.use(authMiddleware);

// задаване на express да използва handlebars като view engine
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');



// задаваме нашия сървър да ползва модулярния рутер за пътищата като middleware - добре е да стои последен
app.use(routes);

// connect to database with mongoose
mongoose.connect('mongodb://localhost:27017/course-book');

// event listener който потвърждава че база данните е свързана
mongoose.connection.on('connected', () => console.log('DB is connected'));
// event listener при грешка в база данните ще отпечата грешката
mongoose.connection.on('error', (err) => console.log('err'));

app.listen(5000, () => console.log('Server is listening on port 5000...'));