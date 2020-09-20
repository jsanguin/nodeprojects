var http = require('http');
var fs = require('fs');

function send404(response) {
    response.writeHead(404, {'content-type': 'text/plain'});
    response.write('Error 404 : Recurso no encontrado');
    response.end();
}

var server = http.createServer(function (req, res) {
    if (req.method == 'GET' && req.url == '/') {
        res.writeHead(200, {'content-type': 'text/html'});
        fs.createReadStream('./views/index.html').pipe(res);
    }
    else {
        send404(res)
    }
}).listen(3000);
console.log("Server running localhost:3000");