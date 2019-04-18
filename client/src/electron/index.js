const { app, BrowserWindow } = require('electron');
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

function handleRequest(req, res) {
  var file = path.join(app.getAppPath(), req.url);
  fs.exists(file, function(exists) {
    if (exists && fs.lstatSync(file).isFile()) {
        res.setHeader("Content-Type", mime.getType(file));
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*'
        });
        fs.createReadStream(file).pipe(res);
        return;
    }
    res.writeHead(404);
    res.write('404 Not Found');
    res.end();
  });
}

function createWindow () {
  let win = new BrowserWindow({ width: 1040, height: 830, backgroundColor: false,
    transparent: true,
    frame: false
  });
  //win.openDevTools();
  win.loadURL('http://localhost:8080/index.html');
}

var server = http.createServer(handleRequest);

server.listen(8080, function() {
  console.log('server started at http://localhost:8080');
});

app.on('close', function() {
  console.log('close');
  server.close(function() {
    app.quit();
  });
});

app.on('window-all-closed', function() {
  console.log('window-all-closed');
  server.close(function() {
    app.quit();
  });
});

app.on('ready', createWindow);