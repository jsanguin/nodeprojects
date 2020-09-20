var http = require('http');
var server = http.createServer(function (req, res) {
    console.log('Request Starting..');
    console.log(req.headers);

    // respond
    res.statusCode = 404;
    res.statusMessage = 'Invalid request made to this server';
    //res.write('Hello World');
    res.end();
})

server.listen(3000);
console.log('Server running at localhost:3000');