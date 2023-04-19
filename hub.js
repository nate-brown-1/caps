// 'use strict';

// require('dotenv').config();

// // modules, maybe need these?
// require('./clients/driver/driver');
// require('./clients/vendor/vendor');

// const { io } = require('socket.io-client');
// const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';

// // hub logger function
// const logEvent = (eventName, payload) => {
//   console.log(`EVENT: {
//       event: ${eventName},
//       time: ${new Date()},
//       payload: `, payload
//   );
// };

// let capsSocket = io(SERVER_URL + '/caps');

// capsSocket.on('pickup', (payload) => {
//   // console.log('hub gets payload');
//   logEvent('pickup', payload);
// });
