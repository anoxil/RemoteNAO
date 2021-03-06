var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = (process.env.PORT || 8080);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('instruction_to_host', function(message) {
    io.emit('instruction_to_host', message);
  });
  socket.on('img_to_client', function(image) {
    io.emit('img_to_client', image);
  });
  socket.on('asking_for_img', function(data) {
    io.emit('asking_for_img', data);
  });
  socket.on('movement_instruction', function(instruction) {
    io.emit('movement_instruction', instruction);
  });
  socket.on('execute_pose', function(pose) {
    io.emit('execute_pose', pose);
  });
  socket.on('text_to_speech', function(message) {
    io.emit('text_to_speech', message);
  });
});

http.listen(port, function(){});