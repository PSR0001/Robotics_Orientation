const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require('cors')
const path = require('path')
require('dotenv').config();

const PORT = Number(process.env.PORT || 3000);


// using template engine pug
app.set('view engine', 'pug')
// set the cors policy
app.use(cors())
app.set('views', path.join(__dirname,'views'))

// Available Routes
app.use('/home',require('./routes/homepage'))
app.use('*',(req,res)=>{
  res.render('webpages/404')
})

server.listen(5000, () => {
  console.log(`Server listening on port ${PORT}`);
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
    


