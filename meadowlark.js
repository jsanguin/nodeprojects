const express = require('express');
const expresshandlebars = require('express-handlebars');

const app = express(); 

const port = process.env.port || 3000;

const fortune = require('./lib/fortune')

// Handlebars setup
app.engine('handlebars', expresshandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

// some routes
//
app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
    
    res.render('about', { fortune: fortune.getFortune() })
})
   
// custom 404 page
app.use( (req, res) => {
    
    res.status(404)
    res.render('404')
});

// custom 500 page
app.use( (err,req, res,next) => {
    console.error(err.message)
    
    res.status(500)
    res.render('500')
});

app.listen(port, () =>
    console.log(`Express Started in port ${port};`)
)