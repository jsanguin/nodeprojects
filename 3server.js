var http = require('http');
var fs = require('fs');
var path = require('path');

function send404(response) {
    response.writeHead(404, {'Content-type' : 'text/plain'});
    response.write('Error 404 - resource not found');
    response.end();
}

var mimeLookup = {
    '.js' : 'application/javascript',
    '.html' : 'text/html'
}

var server = http.createServer( function(req, res) {
    if (req.method == "GET") {

        // resolve path to filesystem path
        var fileurl;
        if (req.url == '/') fileurl = '/index.html';
            else fileurl =req.url;
        var filepath = path.resolve('./views' + fileurl);

        // lookup mime type
        var fileExt = path.extname(filepath);
        var mimeType = mimeLookup[fileExt];
        if (!mimeType) {
            send404(res);
            return;
        }

        // see if we have that file
        fs.exists(filepath, function (exists){
            // if file doesn not exist
            if (!exists) {
                send404(res);
                return;
            };
            // finally stream the file
            res.writeHead(200, {'Content-type': mimeType});
            fs.createReadStream(filepath).pipe(res);
        })

    } else {
        send404(res);
    }
}).listen(3000);
console.log('server listening at locahost:3000');
