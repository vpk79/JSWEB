const express = require('express');

const app = express();

// слагаме за middleware - настройка да използва папка public за статичните файлове
app.use(express.static('public')); 

// още един middleware - body parser който позволява данните да пристигнат в req.body парстнати
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(5000, () => console.log('Server is listening on port 5000...'));