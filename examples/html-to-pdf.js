
var fs = require('fs');
var cc = require('../lib/cloud-convert');

cc.createProcess('html', 'pdf', function(err, result) {
  if (err) return console.error(err);
  var file = fs.createReadStream(__dirname + '/../files/simple.html');
  cc.convert(result.url, 'upload', file, 'pdf', function(err, result) {
    if (err) return console.error(err);
    var file = fs.createWriteStream(__dirname + "/../files/simple.pdf");
    cc.download(result.output.url, function(err, response) {
      if (err) return console.error(err);
      response.pipe(file);
    });
  });
});