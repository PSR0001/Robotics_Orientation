const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const path = require('path')
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

require('dotenv').config();

const PORT = Number(process.env.PORT || 3000);


// using template engine pug
app.set('view engine', 'pug')

// set the cors policy
app.use(cors())
app.set('views', path.join(__dirname, 'views'))

// Available Routes
app.use('/home', require('./routes/homepage'))
app.use('*', (req, res) => {
  res.render('webpages/404')
})

// start http server
server.listen(5000, () => {
  console.log(`Server listening on port ${PORT}`);
});
let clients = [];
// Listener
try {

  io.on("connection", (socket) => {

    console.log(`User with id: ${socket.id} connected!`);

    socket.on("disconnect", () => {
      console.log(`User with id: ${socket.id} disconnected`);
    });
    
    socket.on("toggle", (data) => {
      // console.log(data);
      socket.broadcast.emit("toggle", data);
    });
    socket.on("slider", (data) => {
      // console.log(data);
      socket.broadcast.emit("slider", data);
    });

  });

  //admin-ui
  // instrument(io, { auth: false });
} catch (err) {
  console.log(`Could not start the server, ${err}`);
}

