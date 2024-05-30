const express = require('express');
const app = express();
const routes = require('./routes');
const handlebars = require('express-handlebars');

// слагаме за middleware - настройка да използва папка public за статичните файлове
app.use(express.static('public')); 

// още един middleware - body parser който позволява данните от формите да пристигнат в req.body парстнати
app.use(express.urlencoded({extended: false}));


// задаване на express да използва handlebars като view engine
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');

// задаваме нашия сървър да ползва модулярния рутер за пътищата като middleware - добре е да стои последен
app.use(routes);

app.listen(5000, () => console.log('Server is listening on port 5000...'));