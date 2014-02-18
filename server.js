var util = require('util');
var http = require('http');
var connect = require('connect');
var say = require('say');
var config = require('./config');

var app = connect()
  .use(connect.urlencoded())
  .use(connect.json())
  .use(function(req, res){
    util.log("Incoming request");
    
    if (req.body) {
    
      if(config.debug) { util.log(util.format("Body : %j", req.body)); }
      
      if (req.body.alert) {
        var alert = JSON.parse(req.body.alert);
        
        var msg = alert.short_description;
        
        say.speak('voice_kal_diphone', msg, function () {
          util.log(util.format('%s tts complete', msg));
        });
      }
      
      res.end('success');
    }
  });

http.createServer(app).listen(config.port);
