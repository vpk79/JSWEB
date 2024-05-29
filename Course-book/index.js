const express = require('express');

const app = express();

// middleware - настройка да използва папка public за статичните файлове
app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(5000, () => console.log('Server is listening on port 5000...'));