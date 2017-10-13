var http =  require('http');
var fs = require('fs')

var myReadStream = fs.createReadStream(__dirname +'/read.txt');


var server = http.createServer(function(req,res) {
  res.writeHead(200, {'Content-Type': 'Text/html'});

  var myReadStream = fs.createReadStream(__dirname +'/index.html', 'utf8')
  myReadStream.pipe(res);

})

server.listen(3000)
console.log('Server is running on port 3000')