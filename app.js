var express = require('express');
var server = express();
server.use(express.static(__dirname + '/public'));

console.log('listening at "localhost:3000"');
server.listen(3000);