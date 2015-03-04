#!/usr/local/bin/node
var config = require('./config/default.json');
var http = require('http');
var qs = require('qs');

var request = require('request');


http.createServer(function (req, res) {
  var data = '';
  req.on('data', function(chunk) { data += chunk; });
  req.on('end', function() {
    var params = qs.parse(data);
    var options = {
      uri: "https://hooks.slack.com/services/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"
    };
    options.form = JSON.stringify( {
        username: "syno",
        icon_emoji: ":ghost:",
        channel: '#' + params.channel_name,
        text: params.user_name + ' open a room: <http://syno.in/vchat.html?' +
              params.text + '|' + params.text + '>'
    });
    request.post(options, function(error, response, body){
      if (!error && response.statusCode == 200) {
        console.log(body.name);
      } else {
        console.log('error: '+ response.statusCode + body);
      }
    });
//    res.writeHead(200, {'Content-Type': 'application/json'});
//    res.write('{ "text": "http://syno.in/vchat.html?' + qs.parse(data).text + '", "username": "vv" }');
    res.end();
  }).on('error', function(e){
    console.log(e.message);
  });
}).listen(config.port);

