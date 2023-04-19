// socket.io server

'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors);

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`express listening on ${PORT}`);
});


const io = new Server(PORT);

// start server, don't think I need any of these emitters, for reference only
io.on('connection', (socket) => {
  console.log('client has connected to server', socket.id);

  // socket.on('event', (payload) => {

  // emit back to same client that emitted event
  // socket.emit('event', payload);

  // notify entire server, including original emitter
  // io.emit('event', payload);

  // event broadcast syntax
  // emits to all clients except original emitter
  // socket.broadcast.emit('event', payload);

  // });
});


// hub logger function
const logEvent = (eventName, payload) => {
  console.log(
      `EVENT: {
      event: ${eventName},
      time: ${new Date()},
      payload: `, payload
  );
};

// create namespace for CAPS
let capsServer = io.of('/caps');

// turn on the namespace
capsServer.on('connection', (socket) => {
  // console.log('client connected to CAPS namespace ', socket.id);

  socket.on('join-room', (payload) => {
    socket.join(payload.roomId);
  });

  socket.on('pickup', (payload) => {
    logEvent('pickup', payload);
    socket.broadcast.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    logEvent('in-transit', payload);
    socket.broadcast.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    logEvent('delivered', payload);
    socket.broadcast.emit('delivered', payload);
  });

  // capsServer.to('room-Id').emit('pickup', payload);

});

