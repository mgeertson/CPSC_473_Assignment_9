var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var mime = require('mime');
var wss = require('./websockets-server');

var handleError = function(req, res) {
    res.writeHead(404);
    res.end();
};

var server = http.createServer(function(req, res) {
    console.log('Responding to a request.');
    var filePath = extract(req.url);
    //Display MIME type for requested URL
    console.log('MIME: ' + mime.lookup(filePath));
    fs.readFile(filePath, function(err, data) {
        if (err) {
            handleError(err, res);
            return;
        } else {
            res.setHeader('Content-Type', mime.lookup(filePath));
            res.end(data);
        }
    });
});
server.listen(3000);
