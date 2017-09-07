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
  console.log('Make socket connection', socket.id);

  socket.on('clientMessage', (data) => {
    //save message to database

    //then emit to all client sockets
    io.sockets.emit('serverMessage', data);

  });
});