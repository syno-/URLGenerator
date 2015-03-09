#!/usr/local/bin/node
var config = require(__dirname + '/config/default.json');
var http = require('http');
var qs = require('qs');
var request = require('request');

var uris = {
"dsv2oGnrCq3TPfSeXmNH4A8J": "https://hooks.slack.com/services/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",
"BANg76qKfv2PhOFI0a0KHlPb": "https://hooks.slack.com/services/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"
};

http.createServer(function (req, res) {
  var data = '';
  req.on('data', function (chunk) { data += chunk; });
  req.on('end', function () {
    var params = qs.parse(data);
    var options = { "uri": uris[params.token] };
    options.form = JSON.stringify( {
//        username: "syno",
//        icon_emoji: ":ghost:",
//        channel: (params.channel_name === "directmessage")? '@' : 
//                 (params.channel_name === "privategroup") : "" : "#" + params.channel_name,
        channel: params.channel_id,
//        channel_id: params.channel_id,
        text: '@' + params.user_name + ' has opened a video chat room: <https://syno.in/' +
              params.text + '|' + params.text + '>'
    });
    request.post(options, function(error, response, body){
      if ( response.statusCode != 200) {
        console.log('error: '+ response.statusCode + body);
      }
    });
//    res.writeHead(200, {'Content-Type': 'application/json'});
//    res.write('{ "text": "http://syno.in/vchat.html?' + qs.parse(data).text + '", "username": "vv" }');
    res.end();
  }).on('error', function (error){
    console.log(error.message);
  });
}).listen(config.port);

