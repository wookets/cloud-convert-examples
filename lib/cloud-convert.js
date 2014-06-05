
var request = require('request');
var config = require('../config');

exports.createProcess = function(inputFormat, outputFormat, callback) {
  var options = {
    uri: 'https://api.cloudconvert.org/process',
    json: {
      "apikey": config.API_KEY,
      "inputformat": inputFormat,
      "outputformat": outputFormat
    }
  };
  request.post(options, function (error, response, body) {
    if (error) return callback(error);
    if (response.statusCode !== 200) return callback(Error(response.statusCode + ' - ' + body));
    callback(null, body)
  });
};

exports.convert = function(url, inputType, file, outputFormat, callback) {
  if (url.indexOf('//') === 0) {
    url = 'https:' + url;
  }
  var r = request.post(url, function(error, response, body) {
    if (error) return callback(error);
    if (response.statusCode !== 200) return callback(Error(response.statusCode + ' - ' + body));
    callback(null, JSON.parse(body));
  });
  var form = r.form();
  form.append('input', inputType);
  form.append('outputformat', outputFormat);
  form.append('file', file);
};

exports.download = function(url, callback) {
  if (url.indexOf('//') === 0) {
    url = 'https:' + url;
  }
  request.get(url, callback);
};
