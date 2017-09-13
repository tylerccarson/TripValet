'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.PORT || 3000;

let server = app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT + '!');
});

const socket = require('socket.io');
var io = socket(server, {secure: true});

io.on('connection', (socket) => {
  
  socket.on('clientMessage', (data) => {
    io.sockets.emit('serverMessage', data.data);
  });

  socket.on('clientAvailabilityAdd', (data) => {
    io.sockets.emit('serverAvailabilityAdd', data);
  });

  socket.on('clientAvailabilityDelete', (data) => {
    io.sockets.emit('serverAvailabilityDelete', data);
  });

});