const express = require('express');
const app = express();
const routes = require('./routes')

// слагаме за middleware - настройка да използва папка public за статичните файлове
app.use(express.static('public')); 

// още един middleware - body parser който позволява данните от формите да пристигнат в req.body парстнати
app.use(express.urlencoded({extended: false}));

// задаваме нашия сървър да ползва модулярния рутер за пътищата като middleware
app.use(routes);

app.listen(5000, () => console.log('Server is listening on port 5000...'));