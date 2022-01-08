const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


server.listen(5000, () => {
  console.log('listening on *:3000');
});


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });

      socket.on('chat message', (msg) => {
          io.emit('chat message', msg);
        });
        
    });
    
    // socket.broadcast.emit('hi');
//   io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

