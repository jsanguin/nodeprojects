var http = require('http');

var server = http.createServer(function (request, response) {
    console.log('request starting . . . ::');
    console.log(request.headers);
    // respond
    response.write('hello client...');
    response.end();
});

server.listen(3000);
console.log('Server running using port 3000');