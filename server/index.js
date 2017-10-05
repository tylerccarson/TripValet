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

  socket.on('clientAvailabilityMultipleDelete', (idArray) => {
    io.sockets.emit('serverAvailabilityMultipleDelete', idArray);
  });

  socket.on('clientConfirmation', (data) => {
    io.sockets.emit('serverConfirmation', data);
  });

  socket.on('clientAddSchedule', (data) => {
    console.log(data.data);
    io.sockets.emit('serverAddSchedule', data.data);
  });

  socket.on('clientDeleteSchedule', (data) => {
    io.sockets.emit('serverDeleteSchedule', data);
  });

});