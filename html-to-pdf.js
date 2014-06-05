
var http = require('http');
var fs = require('fs');
var path = require('path');
var request = require('request');

var options = {
  uri: 'https://api.cloudconvert.org/process',
  json: {
    "apikey": "<api key>",
    "inputformat": "website",
    "outputformat": "pdf"
  }
}

request.post(options, function (error, response, body) {
  if (error || response.statusCode !== 200) {
    console.log('error', error, response.statusCode, body)
  }
  r = request.post('https:'+body.url, function(error, response, body) {
    if (error) {// || response.statusCode !== 200) {
      console.log('error', error, response, body)
    }
    console.log('response', body)
    var file = fs.createWriteStream("simple.pdf");
    request.get('https:' + JSON.parse(body).output.url, function(err, response, body) {
      response.pipe(file);
    });
  })

  var form = r.form()
  form.append('input', 'upload')
  form.append('outputformat', 'pdf')
  form.append('file', fs.createReadStream(path.join(__dirname, 'simple.html')))


})