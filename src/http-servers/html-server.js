const http = require('http');
const fs = require('fs');
const through2 = require('through2');

http.createServer(function(req, res) {
    const file = fs.createReadStream('index.html')
        .pipe(through2.obj(function(chunk) {
            this.push(chunk.toString().replace('{message}', 'Hello world!'));
        }))
        .pipe(res)
        .on('end', () => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end();
        });
}).listen(8888);
