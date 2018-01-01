//var app = require('express')();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
/*
app.get('/', function(req, res){
  res.sendFile(__dirname + '/docs/');
});
*/
app.use(express.static(__dirname + '/docs/'));

io.on('connection', function(socket)
{
  socket.on('chat message', function(msg, intent, type)
  {
    if(msg != "" && msg.length > 0)
    {
      io.emit('chat message', msg, intent, socket.handshake.headers['x-forwarded-for'], type);
      console.log(msg,intent, socket.handshake.headers['x-forwarded-for'])
    }
  });
  
  // console.log(io.engine.clientsCount);
  io.emit("users online",io.engine.clientsCount);
  socket.on('disconnect', function() {
    io.emit("users online",io.engine.clientsCount);
  });
});


http.listen(8080, function(){
  console.log('listening on *:8080');
});
    
    
    