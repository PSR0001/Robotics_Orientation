// const compression = require('compression')
// const helmet = require("helmet");
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const { instrument } = require("@socket.io/admin-ui");
const favicon = require('serve-favicon')
const path = require('path')
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true
  },
});

require('dotenv').config();

const PORT = Number(process.env.PORT || 3000);

// add a favicon
app.use(favicon(path.join(__dirname, 'views', 'assets/icon/favicon.ico')))

// using template engine pug
app.set('view engine', 'pug')

// compress all responses
// app.use(compression())

// protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately
// app.use(helmet());

// set the cors policy
app.use(cors())
app.set('views', path.join(__dirname, 'views'))

// Available Routes
app.use('/home', require('./routes/homepage'))
app.use('*', (req, res) => {
  res.render('webpages/404')
})
 
// start http server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// testing 
let message = {
  "distance": 12,
  "time": 1
}



// Socket listening 
try {

  io.on("connection", (socket) => {

    console.log(`User with id: ${socket.id} connected!`);

    socket.on("disconnect", () => {
      console.log(`User with id: ${socket.id} disconnected`);
    });
    // console.log(socket);
    // socket.on("")

    io.emit("Chart-Data",message)

  });

  //admin-ui
  instrument(io, { auth: false });
} catch (error) {
  console.log(`Could not start the server, ${error}`);
}
