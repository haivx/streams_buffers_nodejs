var fs = require('fs')

var myReadStream = fs.createReadStream(__dirname +'/read.txt');
var myWriteStream = fs.createWriteStream(__dirname +'/write.txt', 'utf8');


// // Using fs-node
myReadStream.on('data', function(chunk) {
  console.log('new chunk received:');
  console.log(chunk);
  console.log('chunk.length', chunk.length);
  myWriteStream.write(chunk)
})

//Using pipe()
// myReadStream.pipe(myWriteStream);
