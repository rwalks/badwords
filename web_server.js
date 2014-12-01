var util = require('util');
var http = require('http');
var fs = require('fs');
var path = require('path');

var app = http.createServer(handler);
app.listen(80);

function handler (req, res) {
    console.log('request starting...');

    var filePath = '.' + req.url.split("?")[0];
    if (req.method !== 'GET') {
	    res.writeHead(400);
	    res.end();
	    return;
	  }
    if (filePath == './')
        filePath = './badwords.html';
    if (filePath == './badwords')
        filePath = './badwords.html';
    if (filePath == './web_server.js')
        filePath = './badwords.html';
    console.log(filePath);
    var s = fs.createReadStream(filePath);
    s.on('error', function () {
      console.log("ERROR!");
      console.log(filePath);
      res.writeHead(404);
      res.end();
    })
    s.once('fd', function () {res.writeHead(200);});
    s.pipe(res);
}

