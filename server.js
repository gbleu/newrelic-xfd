var http = require('http');
var connect = require('connect');
var say = require('say');

var app = connect()
  .use(connect.urlencoded())
  .use(connect.json())
  .use(function(req, res){
    if (req.body && req.body.alert) {
	var alert = JSON.parse(req.body.alert);
	var msg = alert.short_description;
	console.log(msg);

	say.speak('voice_kal_diphone', msg, function () {
	  console.log('tts complete');		
	});
    }

    res.end('success');
  });

http.createServer(app).listen(8000);
