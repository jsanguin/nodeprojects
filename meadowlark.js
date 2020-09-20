const handlers = require('./lib/handlers')

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
app.get('/', handlers.home)

app.get('/about', handlers.about)

app.get('/greeting', (req, res) => {
    res.render(handlers.greeting, {
        message: 'Hello dear programmer!',
        style: req.query.style,
        userid: req.cookies.userid,
        username: req.session.username
    })
})
   
// custom 404 page
app.use( handlers.notFound);

// custom 500 page
app.use( handlers.serverError);

app.listen(port, () =>
    console.log(`Express Started in port ${port};`)
)