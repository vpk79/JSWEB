
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.header({
        'Content-Type': 'text/plain'
    })
    res.send('<h1>Hello World</h1>');
    
})

app.route('/home')
    .get((req, res) => {
        res.send('GET Home page')
    })
	
	.post((req, res) => {
        res.send('POSTHome page')
    })
	
	.all((req, res) => {
        res.send('Everything else')
    })

app.post('/cats', (req, res, next) => {
    console.log('Creating cat!');
    next();
},  (req, res) => {
    res.redirect('/cats')
})


app.get('/cats/:catName', (req, res) => {
    const currentCatName = req.params.catName;
    res.send(`Cat name Page - ${currentCatName}`)
})

app.get('/cats', (req, res) => {
    res.send('Cats Page')
})

app.listen(5000);
console.log('Server is listening on port 5000');