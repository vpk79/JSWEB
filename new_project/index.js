
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.header({
        'Content-Type': 'text/plain'
    })
    res.send('<h1>Hello World</h1>');
    
})


app.get('/cats', (req, res) => {
    res.send('Cats Page')
})

app.listen(5000);
console.log('Server is listening on port 5000');