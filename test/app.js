var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('instruction_to_rpi', function(message) {
    io.emit('instruction_to_rpi', message);
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});




/*
var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    
});



server.listen(8080);

/*
*
 * Create HTTP server.
 

var server = http.createServer(app);
var io = require('socket.io').listen(server);

console.log("STARTING SERVER 🌈 🦄 ✨");

// TURN OFF auth for now.
// require('socketio-auth')(io, {
//   authenticate: function (socket, data, callback) {
//     if (data.key == process.env.SOCKET_KEY) {
//       return callback(null, true);
//     } else {
//       return callback(new Error("Bad credentials"))
//     }
//   }
// });

var piClient = {};

io.on('connection', function(socket){
  console.log("CLIENT CONNECTED 💃 ", socket.id);

  socket.on('clientConnected', function(){
    console.log('Client is online');
    if (piClient.id && piClient.id !== socket.id) {
      io.emit("piConnected");
    } else {
      io.emit("piDisconnected");
    }
  });

  // let any newly connected client know if pi is connected
  if (piClient.id) {
    io.emit("piConnected");
    console.log("Pi in da house", piClient);
  }

  socket.on('stateChanged', function(state){
    console.log(`StateChanged on server: ${JSON.stringify(state)}`);
    io.emit("updateState", state);
  });

  socket.on('piConnected', function(message){
    console.log('Raspberry Pi is online');
    piClient.id = socket.id;
    io.emit("piConnected");
  });

  socket.on('alertShirt', function(colors){
    console.log(`🎨: ${colors}`);
    io.emit("shirtColors", colors);
  });

  socket.on('disconnect', function(){
    console.log('client disconnected 💩')
    if (socket.id == piClient.id) {
      console.log("Bye Bye 👋 👋  Pi Client Disconnected", socket.id);

      // clear out piClient if disconnected
      var y = piClient;
      piClient = {};
      console.log('piDisconnected', piClient);
      io.emit("piDisconnected");
    }
    socket.disconnect();
  });
});


 * Listen on provided port, on all network interfaces.
 

server.listen(port);
*/