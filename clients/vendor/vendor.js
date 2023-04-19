'use strict';

require('dotenv').config();

const { generatePayload, handleDelivered } = require('./vendor-handler.js');

const { io } = require('socket.io-client');
const SERVER_URL = 'https://caps-awvp.onrender.com' || process.env.SERVER_URL /*|| 'http://localhost:3001'*/;

let capsSocket = io(SERVER_URL + '/caps');

// start by generating a payload
// send to entire namespace
capsSocket.emit('pickup', generatePayload());

// last thing, say thanks for order
// not complete
capsSocket.on('delivered', (payload) => {
  handleDelivered(payload);
});


// process.exit()
// end node process after order delivered