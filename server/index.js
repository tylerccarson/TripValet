'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.PORT || 3000;

let server = app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT + '!');
});

//socket setup
const socket = require('socket.io');
var io = socket(server, {secure: true});

io.on('connection', (socket) => {
  //send new messages to all other sockets
  socket.on('clientMessage', (data) => {
    io.sockets.emit('serverMessage', data.data);
  });
});